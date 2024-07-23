import db from "@/db";
import { notFound } from "next/navigation";
import DesignConfiguration from "./DesignConfigurator";
import isValidId from "@/lib/validators/is-valid-id";
import getCaseConfiguration from "@/data-access/get-case-configuration";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function page({ searchParams }: PageProps) {
  const { id } = searchParams;
  if (!id || typeof id !== "string" || !isValidId(id)) notFound();

  const configuration = await getCaseConfiguration(id);
  if (!configuration) notFound();

  const { imgUrl, width, height } = configuration;

  return <DesignConfiguration configId={id} imgUrl={imgUrl} imgDimension={{ width, height }} />;
}

export default page;
