import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOTP } from "@/lib/utils";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success to prevent email enumeration
    if (!user || !user.emailVerified || !user.password) {
      return NextResponse.json({ message: "If this email exists, a reset code has been sent." });
    }

    await prisma.otpToken.deleteMany({ where: { userId: user.id, type: "RESET" } });

    const otp = generateOTP();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otpToken.create({
      data: { userId: user.id, email, token: otp, type: "RESET", expires },
    });

    await sendPasswordResetEmail(email, otp, user.name || "User");

    return NextResponse.json({
      message: "If this email exists, a reset code has been sent.",
      userId: user.id,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
