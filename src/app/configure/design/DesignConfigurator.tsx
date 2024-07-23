"use client";
import ImageNext from "next/image";
import { useRef, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Rnd } from "react-rnd";

import HandleComponent from "@/components/HandleComponent";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

import phoneTemplate from "@/../public/phone-template.png";
import { BASE_PRICE } from "@/config/products";
import { DesignPageProps, OptionsCaseT } from "@/lib/types";
import { cn, dataURLtoFile, formatPrice } from "@/lib/utils";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/lib/validators/option-validator";
import ConfigurationForm from "./ConfigurationForm";

const INIT_DIM = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};

function DesignConfiguration({ configId, imgUrl, imgDimension }: DesignPageProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [options, setOptions] = useState<OptionsCaseT>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const [renderedDim, setRenderedDim] = useState({
    width: imgDimension.width / 4,
    height: imgDimension.height / 4,
  });
  const [renderedPosition, setRenderedPosition] = useState({
    x: 0,
    y: 0,
  });

  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const phoneCase = phoneCaseRef.current?.getBoundingClientRect() || INIT_DIM;
  const container = containerRef.current?.getBoundingClientRect() || INIT_DIM;
  const leftOffset = phoneCaseRef.current ? phoneCase.left - container.left : 0;
  const topOffset = phoneCaseRef.current ? phoneCase.top - container.top : 0;

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      router.push(`/configure/preview?id=${configId}`);
    },
    onUploadError: () => {
      toast({
        title: "Something went wrong",
        description: "There was a problem saving your config, please try again.",
        variant: "destructive",
      });
    },
  });

  function updateInitCoors() {
    // calculate the width so the user’s image’s height fits the case’s height
    const imgWidth = (phoneCase.height * imgDimension.width) / imgDimension.height;
    // calculate img x coord to center img in case
    const imgCenterX = leftOffset + phoneCase.width / 2 - imgWidth / 2;

    setRenderedPosition({ x: imgCenterX, y: topOffset });
    setRenderedDim({ width: imgWidth, height: phoneCase.height });
  }

  async function saveConfiguration() {
    try {
      const actualX = renderedPosition.x ? renderedPosition.x - leftOffset : leftOffset;
      const actualY = renderedPosition.y ? renderedPosition.y - topOffset : topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = phoneTemplate.width;
      canvas.height = phoneTemplate.height;
      const ctx = canvas.getContext("2d");

      const userImg = new Image();
      userImg.crossOrigin = "anonymous";
      userImg.src = imgUrl;
      await new Promise((resolve) => (userImg.onload = resolve));

      // rescale units to create a img with better resolution
      const scale = phoneTemplate.width / phoneCase.width;

      ctx?.drawImage(
        userImg,
        actualX * scale,
        actualY * scale,
        renderedDim.width * scale,
        renderedDim.height * scale
      );

      const dataURL = canvas.toDataURL("image/webp", 1);
      const file = await dataURLtoFile(dataURL, `canvas-${configId}.webp`);

      await startUpload([file], {
        configId,
        caseConfig: options,
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was a problem saving your config, please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
      <div
        ref={containerRef}
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-grey-300 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ref={phoneCaseRef}
            ratio={896 / 1831}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
          >
            <ImageNext
              fill
              alt="phone image"
              src={phoneTemplate}
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>

        <Rnd
          size={renderedDim}
          position={renderedPosition}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedDim({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });
            setRenderedPosition({ x, y });
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderedPosition({ x, y });
          }}
          className="absolute z-20 border-[3px] border-primary animate-appears"
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topLeft: <HandleComponent />,
            topRight: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full ">
            <ImageNext
              onLoad={updateInitCoors}
              src={imgUrl}
              fill
              alt="your image"
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
        <ConfigurationForm options={options} setOptions={setOptions} />

        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(BASE_PRICE + options.finish.price + options.material.price)}
              </p>
              <Button
                onClick={saveConfiguration}
                className="w-full"
                size="sm"
                isLoading={isUploading}
                loadingText="Uploading..."
                disabled={isUploading}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignConfiguration;
