import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getRazorpay } from "@/lib/razorpay";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseIds } = await req.json();

    const courses = await prisma.course.findMany({
      where: { id: { in: courseIds }, status: "PUBLISHED" },
      select: {
        id: true,
        title: true,
        price: true,
        discountPrice: true,
      },
    });

    if (courses.length === 0) {
      return NextResponse.json(
        { error: "No valid courses found" },
        { status: 400 }
      );
    }

    const totalAmount = courses.reduce(
      (sum, c) => sum + (c.discountPrice || c.price),
      0
    );

    const order = await getRazorpay().orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        userId: session.user.id,
        courseIds: JSON.stringify(courseIds),
      },
    });

    // Create pending order in DB
    await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount,
        currency: "INR",
        status: "PENDING",
        paymentMethod: "razorpay",
        paymentOrderId: order.id,
        orderItems: {
          create: courses.map((c) => ({
            courseId: c.id,
            price: c.discountPrice || c.price,
          })),
        },
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay error:", error);
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}
