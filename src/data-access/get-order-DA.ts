import db from "@/db";
import { Order } from "@prisma/client";

export default async function getOrderDA(configId: string, userId: string): Promise<Order | null> {
  return await db.order.findUnique({
    where: { id: configId, userId: userId },
  });
}
