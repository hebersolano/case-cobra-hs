import db from "@/db";
import { isCuid } from "@paralleldrive/cuid2";
import { notFound } from "next/navigation";
import DesignConfiguration from "./DesignConfigurator";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function page({ searchParams }: PageProps) {
  const { id } = searchParams;
  if (!id || typeof id !== "string" || !isCuid(id)) notFound();
  const configuration = await db.configuration.findUnique({
    where: { id },
  });
  if (!configuration) notFound();

  const { imgUrl, width, height } = configuration;

  return <DesignConfiguration configId={id} imgUrl={imgUrl} imgDimension={{ width, height }} />;
}

export default page;
