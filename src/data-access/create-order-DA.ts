import db from "@/db";
import { Order, Prisma } from "@prisma/client";
export default async function createOrderDA(
  orderPrice: number,
  configId: string,
  userId: string
): Promise<Order | undefined> {
  return await db.order.create({
    data: { amount: orderPrice, userId, configurationId: configId },
  });
}
