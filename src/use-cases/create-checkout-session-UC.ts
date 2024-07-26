import type {
  CreateOrderDA,
  CreateStripeSession,
  GetCaseConfiguration,
  GetOrder,
  GetOrderPrice,
  GetUser,
  IsValidId,
} from "@/lib/types";
import type { Order } from "@prisma/client";

export default async function createCheckoutSessionUC(
  ctx: {
    getUser: GetUser;
    isValidId: IsValidId;
    getCaseConfiguration: GetCaseConfiguration;
    getOrderPrice: GetOrderPrice;
    getOrderDA: GetOrder;
    createOrderDA: CreateOrderDA;
    createStripeSession: CreateStripeSession;
  },
  data: { configId: string }
): Promise<string> {
  const user = await ctx.getUser();
  if (!user || user == null || !user.id)
    throw new Error("Something went wrong with authentication");

  if (!ctx.isValidId(data.configId)) throw new Error("Invalid case configuration id");

  const caseConfiguration = await ctx.getCaseConfiguration(data.configId);
  if (!caseConfiguration) throw new Error("Configuration no found");

  const orderPrice = ctx.getOrderPrice(caseConfiguration);

  let order: Order | undefined;
  const existingOrder = await ctx.getOrderDA(caseConfiguration.id, user.id);

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await ctx.createOrderDA(orderPrice, caseConfiguration.id, user.id);
    if (!order) throw new Error("Error creating new order");
  }

  const url = await ctx.createStripeSession(
    orderPrice,
    [caseConfiguration.croppedImgUrl!],
    caseConfiguration.id,
    user.id,
    order?.id
  );

  if (!url) throw new Error("Error creating stripe session");

  return url;
}
