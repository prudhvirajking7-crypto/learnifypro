import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const courseIds = JSON.parse(session.metadata?.courseIds || "[]");

    if (!userId || courseIds.length === 0) {
      return NextResponse.json({ received: true });
    }

    const courses = await prisma.course.findMany({
      where: { id: { in: courseIds } },
      select: { id: true, title: true, price: true, discountPrice: true },
    });

    const totalAmount = courses.reduce(
      (sum, c) => sum + (c.discountPrice || c.price),
      0
    );

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        currency: "INR",
        status: "COMPLETED",
        paymentMethod: "stripe",
        paymentId: session.payment_intent as string,
        orderItems: {
          create: courses.map((c) => ({
            courseId: c.id,
            price: c.discountPrice || c.price,
          })),
        },
      },
    });

    await Promise.all([
      ...courseIds.map((courseId: string) =>
        prisma.enrollment.upsert({
          where: { userId_courseId: { userId, courseId } },
          update: {},
          create: { userId, courseId },
        })
      ),
      prisma.cartItem.deleteMany({
        where: { userId, courseId: { in: courseIds } },
      }),
    ]);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    });

    if (user?.email && user?.name) {
      await sendOrderConfirmationEmail(user.email, user.name, {
        courses: courses.map((c) => c.title),
        total: totalAmount,
        orderId: order.id.slice(0, 8).toUpperCase(),
      }).catch(console.error);
    }
  }

  return NextResponse.json({ received: true });
}
