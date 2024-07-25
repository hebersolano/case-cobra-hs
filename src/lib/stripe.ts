import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) throw new Error("Stripe secret key not found");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export default stripe;

export async function createStripeSession(
  orderPrice: number,
  images: string[] | undefined,
  caseConfigId: string,
  userId: string,
  orderId: string
): Promise<string | null> {
  const products = await stripe.products.create({
    name: "Custom Iphone Case",
    images,
    default_price_data: {
      currency: "USD",
      unit_amount: orderPrice,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${orderId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${caseConfigId}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["DE", "US", "HN"] },
    metadata: {
      userId,
      orderId,
    },
    line_items: [{ price: products.default_price as String, quantity: 1 }],
  } as any);

  return stripeSession.url;
}
