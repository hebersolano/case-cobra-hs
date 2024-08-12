"use client";
import Loading from "@/components/Loading";
import LoginModal from "@/components/LoginModal";
import Phone from "@/components/Phone";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { BASE_PRICE, PRODUCT_PRICE } from "@/config/products";
import { cn, formatPrice, getCaseConfigLabels, getOrderPrice, isValidId } from "@/lib/utils";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ArrowRight, Check } from "lucide-react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import useSWR from "swr";
import { createCheckoutSessionAction, getCaseConfigurationAction } from "./actions";

function DesignPreview() {
  const router = useRouter();
  const { getUser } = useKindeBrowserClient();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRedirecting, startRedirecting] = useTransition();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if (!id || typeof id !== "string" || !isValidId(id)) notFound();

  const { data: userCaseConfig, isLoading } = useSWR(
    "case-configuration",
    getCaseConfigurationAction.bind(null, id!),
    {
      errorRetryInterval: 500,
      errorRetryCount: 2,
      onError: () =>
        toast({
          title: "Something went wrong",
          description: "Error retrieving your case configuration",
          variant: "destructive",
        }),
    }
  );

  if (isLoading && userCaseConfig === undefined) return <Loading />;
  if (userCaseConfig === false) notFound();

  const { id: configId, croppedImgUrl, finish, material } = userCaseConfig!;

  const { caseColor, phoneModel } = getCaseConfigLabels(userCaseConfig!);

  const orderPrice = getOrderPrice(userCaseConfig!);

  async function handleCheckout() {
    const user = getUser();

    if (user?.id) {
      const { url } = await createCheckoutSessionAction({ configId });
      if (url === undefined) {
        toast({
          title: "Something went wrong",
          description: "There was a problem redirecting you to the payment platform",
          variant: "destructive",
        });
        return;
      }
      router.push(url);
    } else {
      localStorage.setItem("configurationId", configId);
      setIsLoginModalOpen(true);
    }
  }

  return (
    <div className="mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className=" md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
        <Phone
          imgSrc={croppedImgUrl!}
          className={cn(`bg-${caseColor?.tw}`, "max-w-[150px] md:max-w-full")}
        />
      </div>

      <div className="mt-6 sm:col-span-9  md:row-end-1">
        <h3 className="text-3xl font-bold tracking-tight text-foreground ">
          Your {phoneModel} Case
        </h3>
        <div className=" mt-3 flex items-center gap-1.5 text-base">
          <Check className="h-4 w-4 text-primary" />
          In stock and ready to ship
        </div>
      </div>

      <div className="sm:col-span-12 md:col-span-9 text-base">
        <div className="grid grid-cols-1 gap-y-8 border-b border-border py-8  sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
          <div>
            <p className="font-medium "> Highlights</p>
            <ol className="mt-3 text-muted-foreground list-disc list-inside">
              <li>Wireless charging compatible</li>
              <li>TPU shock absorption</li>
              <li>Packaging made from recycled materials</li>
              <li>5 year print warranty</li>
            </ol>
          </div>

          <div>
            <p className="font-medium">Materials</p>
            <ol className="mt-3 text-muted-foreground list-disc list-inside">
              <li>High-quality, durable material</li>
              <li>Scratch and fingerprint resistant coating</li>
            </ol>
          </div>
        </div>

        <div className="mt-8 ">
          <div className="bg-secondary/20 p-6 sm:rounded-lg sm:p-8">
            <div className="flow-root text-sm">
              <div className="flex items-center justify-between py-1 mt-2">
                <p className="">Base price:&nbsp;</p>
                <p className="font-medium "> {formatPrice(BASE_PRICE)}</p>
              </div>

              {material === "polycarbonate" && (
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className=" ">Soft polycarbonate material: &nbsp; </p>
                  <p className="font-medium ">
                    {formatPrice(PRODUCT_PRICE.material.polycarbonate)}
                  </p>
                </div>
              )}

              {finish === "textured" && (
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className=" ">Textured finish: &nbsp; </p>
                  <p className="font-medium ">{formatPrice(PRODUCT_PRICE.finish.textured)}</p>
                </div>
              )}

              <div className="my-2 h-px bg-muted-foreground" />

              <div className="flex items-center justify-between py-2">
                <p className="font-semibold ">Order total</p>
                <p className="font-semibold ">{formatPrice(orderPrice)}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end pb-12">
            <Button
              onClick={startRedirecting.bind(null, handleCheckout)}
              isLoading={isRedirecting}
              loadingText="redirecting..."
              disabled={isRedirecting}
              className="px-4 sm:px-6 lg:px-8"
            >
              Check out <ArrowRight className="h-4 w-4 ml-1.5 inline" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignPreview;
