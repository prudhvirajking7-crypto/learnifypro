import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withDbRetry } from "@/lib/db-retry";
import { generateOTP } from "@/lib/utils";
import { sendOTPEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    const user = await withDbRetry(() => prisma.user.findUnique({ where: { id: userId } }));
    if (!user || !user.email) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Rate limit: allow resend after 1 minute
    const recentOtp = await withDbRetry(() =>
      prisma.otpToken.findFirst({
        where: { userId, createdAt: { gt: new Date(Date.now() - 60 * 1000) } },
        orderBy: { createdAt: "desc" },
      })
    );

    if (recentOtp) {
      return NextResponse.json(
        { error: "Please wait 1 minute before requesting a new OTP." },
        { status: 429 }
      );
    }

    const otp = generateOTP();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await withDbRetry(() =>
      prisma.$transaction([
        prisma.otpToken.deleteMany({ where: { userId } }),
        prisma.otpToken.create({ data: { userId, email: user.email!, token: otp, expires } }),
      ])
    );

    await sendOTPEmail(user.email, otp, user.name || undefined);

    return NextResponse.json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }
}
