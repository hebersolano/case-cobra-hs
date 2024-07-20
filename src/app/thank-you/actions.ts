"use server";

import db from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";

const typedOrderInclude = Prisma.validator<Prisma.OrderInclude>()({
  billingAddress: true,
  configuration: true,
  shippingAddress: true,
  user: true,
});

export async function getPaymentStatus({ orderId }: { orderId: string }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user == null || !user.id)
      throw new Error("Something went wrong with authentication");

    const order = await db.order.findUnique({
      where: { id: orderId, userId: user.id },
      include: typedOrderInclude,
    });

    if (!order) return false;

    console.log(order.isPaid);
    if (order.isPaid) return order;
    return false;
  } catch (error) {
    return false;
  }
}
