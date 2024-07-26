import { COLORS, FINISHES, MATERIALS, MODELS } from "@/lib/validators/option-validator";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { Configuration, Order } from "@prisma/client";
import Stripe from "stripe";
import { boolean } from "zod";

export type SearchParamsPageT = {
  searchParams: { [key: string]: string | undefined };
};

export type DesignPageProps = {
  configId: string;
  imgUrl: string;
  imgDimension: { width: number; height: number };
};

export type OptionsCaseT = {
  color: (typeof COLORS)[number];
  model: (typeof MODELS.options)[number];
  material: (typeof MATERIALS.options)[number];
  finish: (typeof FINISHES.options)[number];
};

export type IsValidId = (id: string) => boolean;

export type GetCaseConfiguration = (configId: string) => Promise<Configuration | null>;

export type GetUser = () => Promise<KindeUser | null>;

export type GetOrderPrice = (caseConfiguration: Configuration) => number;

export type GetOrder = (configId: string, userId: string) => Promise<Order | null>;

export type CreateOrderDA = (
  orderPrice: number,
  configId: string,
  userId: string
) => Promise<Order | undefined>;

export type CreateStripeSession = (
  orderPrice: number,
  images: string[] | undefined,
  caseConfigId: string,
  userId: string,
  orderId: string
) => Promise<string | null>;

export type CreateCaseConfigurationDA = (
  imgUrl: string,
  imgDimensions: {
    width: number;
    height: number;
  }
) => Promise<Configuration>;
