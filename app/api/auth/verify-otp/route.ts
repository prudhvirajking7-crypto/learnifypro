import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withDbRetry } from "@/lib/db-retry";
import { sendWelcomeEmail } from "@/lib/email";
import { z } from "zod";

const verifySchema = z.object({
  userId: z.string(),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = verifySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { userId, otp } = validation.data;

    const otpToken = await withDbRetry(() =>
      prisma.otpToken.findFirst({
        where: { userId, token: otp, used: false, expires: { gt: new Date() } },
      })
    );

    if (!otpToken) {
      return NextResponse.json(
        { error: "Invalid or expired OTP. Please request a new one." },
        { status: 400 }
      );
    }

    const user = await withDbRetry(() =>
      prisma.$transaction(async (tx) => {
        await tx.user.update({ where: { id: userId }, data: { emailVerified: new Date() } });
        await tx.otpToken.update({ where: { id: otpToken.id }, data: { used: true } });
        return tx.user.findUnique({ where: { id: userId } });
      })
    );
    if (user?.email && user?.name) {
      await sendWelcomeEmail(user.email, user.name).catch(console.error);
    }

    return NextResponse.json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}
