"use client";
import Phone from "@/components/Phone";
import { Button } from "@/components/ui/button";
import { BASE_PRICE, PRODUCT_PRICE } from "@/config/products";
import { cn, formatPrice } from "@/lib/utils";
import { COLORS, FINISHES, MODELS } from "@/lib/validators/option-validator";
import { Configuration } from "@prisma/client";
import { ArrowRight, Check } from "lucide-react";
import { useState, useTransition } from "react";
import { createCheckoutSession } from "./actions";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModal from "@/components/LoginModal";

function DesignPreview({ userConfig }: { userConfig: Configuration }) {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRedirecting, startRedirecting] = useTransition();
  const { isAuthenticated, user } = useKindeBrowserClient();

  async function handleCheckout() {
    if (isAuthenticated && user?.id) {
      const { url } = await createCheckoutSession({ configId: userConfig.id });
      if (!url) throw new Error("Unable to redirect to Stripe");
      router.push(url);
    } else {
      localStorage.setItem("configurationId", userConfig.id);
      setIsLoginModalOpen(true);
    }
  }

  const { croppedImgUrl, color, model, finish, material } = userConfig;
  const caseColor = COLORS.find((supportedColors) => supportedColors.value === color);
  const phoneModel = MODELS.options.find(
    (supportedModels) => supportedModels.value === model
  )?.label;

  let orderTotalPrice = BASE_PRICE;
  if (material === "polycarbonate") orderTotalPrice += PRODUCT_PRICE.material.polycarbonate;
  if (finish === "textured") orderTotalPrice += PRODUCT_PRICE.finish.textured;

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
        <h3 className="text-3xl font-bold tracking-tight text-gray-900 ">Your {phoneModel} Case</h3>
        <div className=" mt-3 flex items-center gap-1.5 text-base">
          <Check className="h-4 w-4 text-green-500" />
          In stock and ready to ship
        </div>
      </div>

      <div className="sm:col-span-12 md:col-span-9 text-base">
        <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8  sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
          <div>
            <p className="font-medium text-zinc-950 "> Highlights</p>
            <ol className="mt-3 text-zinc-700 list-disc list-inside">
              <li>Wireless charging compatible</li>
              <li>TPU shock absorption</li>
              <li>Packaging made from recycled materials</li>
              <li>5 year print warranty</li>
            </ol>
          </div>

          <div>
            <p className="font-medium text-zinc-950">Materials</p>
            <ol className="mt-3 text-zinc-700 list-disc list-inside">
              <li>High-quality, durable material</li>
              <li>Scratch and fingerprint resistant coating</li>
            </ol>
          </div>
        </div>

        <div className="mt-8 ">
          <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
            <div className="flow-root text-sm">
              <div className="flex items-center justify-between py-1 mt-2">
                <p className="text-gray-600 ">Base price:&nbsp;</p>
                <p className="font-medium text-gray-900"> {formatPrice(BASE_PRICE)}</p>
              </div>

              {finish === "textured" && (
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600 ">Textured finish: &nbsp; </p>
                  <p className="font-medium text-gray-900">
                    {formatPrice(PRODUCT_PRICE.finish.textured)}
                  </p>
                </div>
              )}

              <div className="my-2 h-px bg-gray-200" />

              <div className="flex items-center justify-between py-2">
                <p className="font-semibold text-gray-900">Order total</p>
                <p className="font-semibold text-gray-900">{formatPrice(orderTotalPrice)}</p>
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
