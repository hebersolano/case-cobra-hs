import type { GetCaseConfiguration, IsValidId } from "@/lib/types";
import { Configuration } from "@prisma/client";

export async function getCaseConfigurationUC(
  ctx: { isValidId: IsValidId; getCaseConfiguration: GetCaseConfiguration },
  data: { configId: string }
): Promise<Configuration | null> {
  if (!ctx.isValidId(data.configId)) throw new Error("Invalid case configuration id");

  const caseConfiguration = await ctx.getCaseConfiguration(data.configId);

  return caseConfiguration;
}
