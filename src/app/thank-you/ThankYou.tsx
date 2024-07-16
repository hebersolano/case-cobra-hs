"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getPaymentStatus } from "./actions";
import { Prisma } from "@prisma/client";

function ThankYou({ orderId }: { orderId: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(
    function () {
      async function getOrder() {
        const order = await getPaymentStatus({ orderId });
        if (order) setData(order);
      }
      getOrder();
    },
    [orderId]
  );

  const status = "";
  if (isLoading)
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-50" />
          <h3 className="font-semibold text-xl">Loading your order...</h3>
          <p>This won&apos;t take long.</p>
        </div>
      </div>
    );
  if (status === "verifying")
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-50" />
          <h3 className="font-semibold text-xl">Verifying your payment...</h3>
          <p>This might take a moment.</p>
        </div>
      </div>
    );

  return <div></div>;
}

export default ThankYou;
