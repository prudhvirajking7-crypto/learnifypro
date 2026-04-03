import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOTP } from "@/lib/utils";
import { sendOTPEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Return same response to prevent email enumeration
      return NextResponse.json({ message: "If this email exists, an OTP was sent." });
    }

    await prisma.otpToken.deleteMany({ where: { userId: user.id } });

    const otp = generateOTP();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otpToken.create({
      data: { userId: user.id, email, token: otp, expires },
    });

    await sendOTPEmail(email, otp, user.name || undefined);

    return NextResponse.json({ userId: user.id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
