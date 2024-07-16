"user server";

import db from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getPaymentStatus({ orderId }: { orderId: string }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user == null || !user.id)
      throw new Error("Something went wrong with authentication");

    const order = await db.order.findUnique({
      where: { id: orderId, userId: user.id },
      include: { billingAddress: true, configuration: true, shippingAddress: true, user: true },
    });

    if (!order) throw new Error("Order does not exist");

    if (order.isPaid) return order;
    return false;
  } catch (error) {
    if (error instanceof Error) return { ok: false, message: error.message };
    return { ok: false, message: error };
  }
}
