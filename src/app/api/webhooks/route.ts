import db from "@/db";
import stripe from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { Resend } from "resend";
import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const body = await req.text();
    const headersList = headers();

    const signature = headersList.get("stripe-signature");
    if (!signature) return new NextResponse("Server Error", { status: 400 });

    let event;

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );

    if (!event) throw new Error("Error verifying event");
    console.log("webhook verified");
    // Handle the event
    console.log(event.type);
    switch (event!.type) {
      case "checkout.session.completed": {
        console.log(event.data.object);
        if (!event.data.object.customer_details?.email) throw new Error("missing user email");
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        if (!checkoutSession.metadata?.userId && !checkoutSession.metadata?.orderId)
          throw new Error("no metadata");

        const { userId, orderId } = checkoutSession.metadata;
        const { name: userName, address: billingAddress } = checkoutSession.customer_details!;
        const shippingAddress = checkoutSession.shipping_details!.address;

        const updatedOrder = await db.order.update({
          where: { id: orderId },
          data: {
            isPaid: true,
            shippingAddress: {
              create: {
                name: userName!,
                city: shippingAddress!.city!,
                country: shippingAddress!.country!,
                postalCode: shippingAddress!.postal_code!,
                street: shippingAddress!.line1!,
                state: shippingAddress!.state!,
              },
            },
            billingAddress: {
              create: {
                name: userName!,
                city: billingAddress!.city!,
                country: billingAddress!.country!,
                postalCode: billingAddress!.postal_code!,
                street: billingAddress!.line1!,
                state: billingAddress!.state!,
              },
            },
          },
        });

        await resend.emails.send({
          from: "CaseCobra <hebersolano1@gmail.com>",
          to: [event.data.object.customer_details.email],
          subject: "Thanks for your order!",
          react: OrderReceivedEmail({
            orderId,
            orderDate: updatedOrder.updatedAt.toLocaleDateString(),
            //@ts-ignore
            shippingAddress: {
              name: userName!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state!,
            },
          }),
        });
        break;
      }
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new NextResponse("ok", { status: 200 });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return new NextResponse("Server Error", { status: 500 });
  }
}
