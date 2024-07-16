import { Suspense } from "react";
import ThankYou from "./ThankYou";
import Loading from "@/components/Loading";
import { SearchParamsPageT } from "@/lib/types";
import { redirect } from "next/navigation";

function ThankYouPage({ searchParams }: SearchParamsPageT) {
  const { orderId } = searchParams;
  if (!orderId) redirect("/");

  return (
    <Suspense fallback={<Loading />}>
      <ThankYou orderId={orderId} />
    </Suspense>
  );
}

export default ThankYouPage;
