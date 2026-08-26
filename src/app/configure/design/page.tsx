import db from "@/db";
import { notFound } from "next/navigation";
import DesignConfiguration from "./DesignConfigurator";
import { isValidId } from "@/lib/utils";
import getCaseConfiguration from "@/data-access/get-case-configuration-DA";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function page(props: PageProps) {
  const searchParams = await props.searchParams;
  const { id } = searchParams;
  if (!id || typeof id !== "string" || !isValidId(id)) notFound();

  const configuration = await getCaseConfiguration(id);
  if (!configuration) notFound();

  const { imgUrl, width, height } = configuration;

  return <DesignConfiguration configId={id} imgUrl={imgUrl} imgDimension={{ width, height }} />;
}

export default page;
