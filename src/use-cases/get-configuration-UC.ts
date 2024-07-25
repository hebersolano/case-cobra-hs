import type { GetCaseConfiguration, IsValidId } from "@/lib/types";
import { Configuration } from "@prisma/client";

export async function getCaseConfigurationUC(
  ctx: { isValidId: IsValidId; getCaseConfiguration: GetCaseConfiguration },
  data: { configId: string }
): Promise<Configuration | false> {
  if (!ctx.isValidId(data.configId)) return false;

  const caseConfiguration = await ctx.getCaseConfiguration(data.configId);

  if (!caseConfiguration || !caseConfiguration?.croppedImgUrl) return false;

  return caseConfiguration;
}
