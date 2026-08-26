import { Suspense } from "react";
import ThankYou from "./ThankYou";
import Loading from "@/components/Loading";
import { SearchParamsPageT } from "@/lib/types";
import { redirect } from "next/navigation";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

async function ThankYouPage(props: SearchParamsPageT) {
  const searchParams = await props.searchParams;
  const { orderId } = searchParams;
  if (!orderId) redirect("/");

  return (
    <Suspense fallback={<Loading />}>
      <ThankYou orderId={orderId} />
    </Suspense>
  );
}

export default ThankYouPage;
