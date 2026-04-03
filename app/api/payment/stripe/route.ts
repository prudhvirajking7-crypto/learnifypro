import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";

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
        thumbnail: true,
        price: true,
        discountPrice: true,
        currency: true,
      },
    });

    if (courses.length === 0) {
      return NextResponse.json(
        { error: "No valid courses found" },
        { status: 400 }
      );
    }

    const lineItems = courses.map((course) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: course.title,
          images: course.thumbnail ? [course.thumbnail] : [],
        },
        unit_amount: Math.round(
          (course.discountPrice || course.price) * 100
        ),
      },
      quantity: 1,
    }));

    const stripeSession = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      metadata: {
        userId: session.user.id,
        courseIds: JSON.stringify(courseIds),
      },
      customer_email: session.user.email || undefined,
    });

    return NextResponse.json({ sessionId: stripeSession.id, url: stripeSession.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}
