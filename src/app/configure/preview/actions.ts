"use server";

import createOrderDA from "@/data-access/create-order-DA";
import getCaseConfiguration from "@/data-access/get-case-configuration-DA";
import getOrderDA from "@/data-access/get-order-DA";
import { createStripeSession } from "@/lib/stripe";
import { getOrderPrice, isValidId } from "@/lib/utils";
import createCheckoutSessionUC from "@/use-cases/create-checkout-session-UC";
import { getCaseConfigurationUC } from "@/use-cases/get-configuration-UC";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getCaseConfigurationAction(configId: string) {
  return await getCaseConfigurationUC({ isValidId, getCaseConfiguration }, { configId });
}

export async function createCheckoutSessionAction({ configId }: { configId: string }) {
  const { getUser } = getKindeServerSession();

  const checkoutURL = await createCheckoutSessionUC(
    {
      isValidId,
      getUser,
      getCaseConfiguration,
      getOrderPrice,
      getOrderDA,
      createOrderDA,
      createStripeSession,
    },
    { configId }
  );

  return { url: checkoutURL };
}
