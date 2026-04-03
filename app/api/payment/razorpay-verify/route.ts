import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findFirst({
      where: {
        userId: session.user.id,
        paymentOrderId: razorpay_order_id,
        status: "PENDING",
      },
      include: {
        orderItems: { include: { course: { select: { id: true, title: true } } } },
        user: { select: { name: true, email: true } },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.order.update({
        where: { id: order.id },
        data: {
          status: "COMPLETED",
          paymentId: razorpay_payment_id,
          paymentSignature: razorpay_signature,
        },
      }),
      ...order.orderItems.map((item) =>
        prisma.enrollment.upsert({
          where: {
            userId_courseId: {
              userId: session.user.id,
              courseId: item.courseId,
            },
          },
          update: {},
          create: {
            userId: session.user.id,
            courseId: item.courseId,
          },
        })
      ),
      prisma.cartItem.deleteMany({
        where: {
          userId: session.user.id,
          courseId: { in: order.orderItems.map((i) => i.courseId) },
        },
      }),
    ]);

    if (order.user.email && order.user.name) {
      await sendOrderConfirmationEmail(
        order.user.email,
        order.user.name,
        {
          courses: order.orderItems.map((i) => i.course.title),
          total: order.totalAmount,
          orderId: order.id.slice(0, 8).toUpperCase(),
        }
      ).catch(console.error);
    }

    return NextResponse.json({ message: "Payment verified successfully!" });
  } catch (error) {
    console.error("Razorpay verify error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
