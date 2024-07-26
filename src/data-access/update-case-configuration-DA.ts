import db from "@/db";
import { OptionsCaseT } from "@/lib/types";

export default async function updateCaseConfigurationDA(
  configId: string,
  url: string,
  caseConfig: OptionsCaseT
): Promise<void> {
  const updatedCaseConfig = await db.configuration.update({
    where: {
      id: configId,
    },
    data: {
      croppedImgUrl: url,
      color: caseConfig?.color.value,
      model: caseConfig?.model.value!,
      material: caseConfig?.material.value,
      finish: caseConfig?.finish.value,
    },
  });
}
