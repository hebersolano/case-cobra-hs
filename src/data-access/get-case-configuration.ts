import db from "@/db";
import { Configuration } from "@prisma/client";

export default async function getCaseConfiguration(
  configId: string
): Promise<Configuration | null> {
  return await db.configuration.findUnique({
    where: { id: configId },
  });
}
