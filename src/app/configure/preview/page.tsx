import DesignPreview from "./DesignPreview";
import { Suspense } from "react";
import Loading from "@/components/Loading";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function PreviewPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DesignPreview />;
    </Suspense>
  );
}

export default PreviewPage;
