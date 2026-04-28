import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withDbRetry } from "@/lib/db-retry";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { userId, otp, newPassword } = await req.json();

    if (!userId || !otp || !newPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const otpToken = await withDbRetry(() =>
      prisma.otpToken.findFirst({
        where: { userId, token: otp, type: "RESET", used: false, expires: { gt: new Date() } },
      })
    );

    if (!otpToken) {
      return NextResponse.json({ error: "Invalid or expired code. Please request a new one." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await withDbRetry(() =>
      prisma.$transaction([
        prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } }),
        prisma.otpToken.update({ where: { id: otpToken.id }, data: { used: true } }),
      ])
    );

    return NextResponse.json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
