import type { CreateCaseConfigurationDA } from "@/lib/types";

export default async function createCaseConfigurationUC(
  ctx: { createCaseConfigurationDA: CreateCaseConfigurationDA },
  data: { imgUrl: string; imgDimensions: { width: number; height: number } }
): Promise<{ configId: string }> {
  const configuration = await ctx.createCaseConfigurationDA(data.imgUrl, data.imgDimensions);

  return { configId: configuration.id };
}
