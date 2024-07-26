import db from "@/db";
import { Configuration } from "@prisma/client";

export default async function createCaseConfigurationDA(
  imgUrl: string,
  imgDimensions: { width: number; height: number }
): Promise<Configuration> {
  const { width, height } = imgDimensions!;

  return await db.configuration.create({
    data: { imgUrl, height, width },
  });
}
