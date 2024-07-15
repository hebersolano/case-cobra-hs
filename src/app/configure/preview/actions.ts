"use server";

import { BASE_PRICE, PRODUCT_PRICE } from "@/config/products";
import db from "@/db";
import stripe from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

export async function createCheckoutSession({ configId }: { configId: string }) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  if (!user || user == null || !user.id)
    throw new Error("Something went wrong with authentication");

  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });
  if (!configuration) throw new Error("No such configuration found");

  const { finish, material } = configuration;
  let orderTotalPrice = BASE_PRICE;
  if (material === "polycarbonate") orderTotalPrice += PRODUCT_PRICE.material.polycarbonate;
  if (finish === "textured") orderTotalPrice += PRODUCT_PRICE.finish.textured;
  console.log("order price", orderTotalPrice);

  let order: Order | undefined;
  const existingOrder = await db.order.findFirst({
    where: { userId: user!.id, configurationId: configuration.id },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: { amount: orderTotalPrice, userId: user!.id, configurationId: configuration.id },
    });
  }

  const products = await stripe.products.create({
    name: "Custom Iphone Case",
    images: [configuration.croppedImgUrl!],
    default_price_data: {
      currency: "USD",
      unit_amount: orderTotalPrice,
    },
  });
  console.log("default price", products.default_price);

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["DE", "US", "HN"] },
    metadata: {
      userId: user?.id,
      orderId: order.id,
    },
    line_items: [{ price: products.default_price as String, quantity: 1 }],
  } as any);

  return { url: stripeSession.url };
}
