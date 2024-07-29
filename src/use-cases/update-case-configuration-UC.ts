import type { IsValidId, OptionsCaseT, UpdateCaseConfigurationDA } from "@/lib/types";

export default async function updateCaseConfigurationUC(
  ctx: { isValidId: IsValidId; updateCaseConfigurationDA: UpdateCaseConfigurationDA },
  data: { configId: string; url: string; caseConfig: OptionsCaseT }
): Promise<void> {
  if (!ctx.isValidId(data.configId)) throw new Error("Invalid case configuration id");

  await ctx.updateCaseConfigurationDA(data.configId, data.url, data.caseConfig);
}
