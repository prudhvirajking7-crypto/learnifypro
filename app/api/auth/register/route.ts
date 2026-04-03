import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { generateOTP } from "@/lib/utils";
import { sendOTPEmail } from "@/lib/email";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      if (existingUser.emailVerified) {
        return NextResponse.json(
          { error: "Email already registered. Please login." },
          { status: 409 }
        );
      }
      // Re-send OTP and update password for unverified account
      const hashedPassword = await bcrypt.hash(password, 12);
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { name, password: hashedPassword },
      });
      await prisma.otpToken.deleteMany({ where: { userId: existingUser.id } });
      const otp = generateOTP();
      const expires = new Date(Date.now() + 10 * 60 * 1000);

      await prisma.otpToken.create({
        data: { userId: existingUser.id, email, token: otp, expires },
      });

      await sendOTPEmail(email, otp, name);

      return NextResponse.json({
        message: "OTP resent. Please verify your email.",
        userId: existingUser.id,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const otp = generateOTP();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otpToken.create({
      data: { userId: user.id, email, token: otp, expires },
    });

    await sendOTPEmail(email, otp, name);

    return NextResponse.json(
      {
        message: "Registration successful. Please verify your email.",
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
