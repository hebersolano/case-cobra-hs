"use client";

import { Loader2 } from "lucide-react";
import { getPaymentStatus } from "./actions";
import useSWR from "swr";
import PhonePreview from "@/components/PhonePreview";
import { formatPrice } from "@/lib/utils";
import Loading from "@/components/Loading";

function ThankYou({ orderId }: { orderId: string }) {
  const { data, error, isLoading } = useSWR("order", getPaymentStatus.bind(null, { orderId }), {
    errorRetryInterval: 500,
    errorRetryCount: 3,
  });

  if (data == undefined) return <Loading />;

  if (data === false)
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-50" />
          <h3 className="font-semibold text-xl">Verifying your payment...</h3>
          <p>This might take a moment.</p>
        </div>
      </div>
    );

  const { configuration, billingAddress, shippingAddress, amount } = data;
  const { color, croppedImgUrl } = configuration;

  return (
    <div className="bg-white">
      <div className="mx-auto max-x-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">Thank you!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Your case is on the way!</h1>
          <p className="mt-2 text-base text-zinc-500">
            We&apos;ve received your order and are now processing it.
          </p>

          <div className="mt-12 text-sm font-medium">
            <p className="text-zinc-900">Order number</p>
            <p className=" mt-2 text-zinc-500">{orderId}</p>
          </div>

          <div className="mt-10 border-t border-zinc-200">
            <div className="mt-10 flex flex-auto flex-col">
              <h4 className="font-semibold text-zinc-900">You made a great choice!</h4>
              <p className="mt-2 text-sm text-zinc-600">
                We at CaseCobra believe that a phone case doesn&apos;t only need to look good, but
                also last for the years to come. We offer a 5-year print guarantee: If your case
                isn&apos;t of the highest quality, we&apos;ll replace it for free.
              </p>
            </div>
          </div>

          <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
            <PhonePreview croppedImgUrl={croppedImgUrl!} color={color!} />
          </div>

          <div>
            <div className="grid  grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <p className="font-medium text-gray-500">Shipping address</p>
                <div className="mt-2 text-zinc-700">
                  <address className="block">{shippingAddress?.name}</address>
                  <address className="block">{shippingAddress?.street}</address>
                  <address className="block">
                    {shippingAddress?.postalCode} {shippingAddress?.city}
                  </address>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-500">Billing address</p>
                <div className="mt-2 text-zinc-700">
                  <address className="block">{billingAddress?.name}</address>
                  <address className="block">{billingAddress?.street}</address>
                  <address className="block">
                    {billingAddress?.postalCode} {billingAddress?.city}
                  </address>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
            <div>
              <p className="font-medium text-zinc-900">Payment status</p>
              <p className="mt-2 text-zinc-700">Paid</p>
            </div>

            <div>
              <p className="font-medium text-zinc-900">Payment method</p>
              <p className="mt-2 text-zinc-700">DHL, takes up to 3 working days </p>
            </div>
          </div>

          <div className="space-y-6 border border-zinc-200 pt-10 text-sm">
            <div className="flex justify-between">
              <p className="font-medium text-zinc-900">Subtotal</p>
              <p className="text-zinc-700">{formatPrice(amount)}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-medium text-zinc-900">Shipping</p>
              <p className="text-zinc-700">{formatPrice(0)}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-medium text-zinc-900">Total</p>
              <p className="text-zinc-700">{formatPrice(0)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
