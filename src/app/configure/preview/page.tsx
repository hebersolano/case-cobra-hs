import DesignPreview from "./DesignPreview";
import { Suspense } from "react";
import Loading from "@/components/Loading";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

async function PreviewPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DesignPreview />
    </Suspense>
  );
}

export default PreviewPage;
