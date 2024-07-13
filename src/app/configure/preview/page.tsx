import db from "@/db";
import { isCuid } from "@paralleldrive/cuid2";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function PreviewPage({ searchParams }: PageProps) {
  const { id } = searchParams;
  if (!id || typeof id !== "string" || !isCuid(id)) notFound();

  const configuration = await db.configuration.findUnique({
    where: { id },
  });
  if (!configuration || !configuration?.croppedImgUrl) notFound();

  return <DesignPreview userConfig={configuration} />;
}

export default PreviewPage;
