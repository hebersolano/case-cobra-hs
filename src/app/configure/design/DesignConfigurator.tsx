"use client";
import { useEffect, useRef, useState } from "react";
import ImageNext from "next/image";

import { Rnd } from "react-rnd";
import { Description, Radio, RadioGroup, Label as RGLabel } from "@headlessui/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";

import phoneTemplate from "@/../public/phone-template.png";
import { cn, dataURLtoFile, formatPrice } from "@/lib/utils";
import HandleComponent from "@/components/HandleComponent";
import { BASE_PRICE } from "@/config/products";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/validators/option-validator";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type CompProps = {
  configId: string;
  imgUrl: string;
  imgDimension: { width: number; height: number };
};

export type OptionsStateT = {
  color: (typeof COLORS)[number];
  model: (typeof MODELS.options)[number];
  material: (typeof MATERIALS.options)[number];
  finish: (typeof FINISHES.options)[number];
};

const INIT_DIM = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};

function DesignConfiguration({ configId, imgUrl, imgDimension }: CompProps) {
  const { toast } = useToast();
  const router = useRouter();

  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasDivRef = useRef<HTMLDivElement>(null);
  const phoneCase = phoneCaseRef.current?.getBoundingClientRect() || INIT_DIM;
  const container = containerRef.current?.getBoundingClientRect() || INIT_DIM;
  const leftOffset = phoneCaseRef.current ? phoneCase.left - container.left : 0;
  const topOffset = phoneCaseRef.current ? phoneCase.top - container.top : 0;
  console.log(leftOffset, topOffset);

  const [options, setOptions] = useState<OptionsStateT>({
    color: COLORS[0],
    model: MODELS.options[MODELS.options.length - 1],
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

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      router.push(`/configure/preview?id=${configId}`);
    },
    onUploadError: (err) => {
      console.log("some upload error", err);
      toast({
        title: "Something went wrong",
        description: "There was a problem saving your config, please try again.",
        variant: "destructive",
      });
    },
  });

  function updateInitCoors() {
    // calc new width if height of img fit case
    const imgWidth = (phoneCase.height * imgDimension.width) / imgDimension.height;
    // calc img x coord to center img in case
    const imgCenterX = leftOffset + phoneCase.width / 2 - imgWidth / 2;
    setRenderedPosition({ x: imgCenterX, y: topOffset });
    setRenderedDim({ width: imgWidth, height: phoneCase.height });
  }

  async function saveConfiguration() {
    console.log("saveConfig running");
    try {
      const actualX = renderedPosition.x ? renderedPosition.x - leftOffset : leftOffset;
      const actualY = renderedPosition.y ? renderedPosition.y - topOffset : topOffset;

      console.log("case w", phoneCase.width, "case h", phoneCase.height);
      console.log("actual x", actualX, "actual y", actualY);

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
      console.log(file);

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
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />

          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl ">customize your case</h2>

            <div className="w-full h-px bg-zinc-200 my-6" />

            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({ ...prev, color: val }));
                  }}
                >
                  <RGLabel>Color: {options.color.label}</RGLabel>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <Radio
                        key={color.label}
                        value={color}
                        className={({ checked }) =>
                          cn(
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none border-2 border-transparent",
                            {
                              [`border-${color.tw}`]: checked,
                            }
                          )
                        }
                      >
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
                <div className="relative flex flex-col gap-3 w-full">
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full jus\
                      "
                      >
                        {options.model.label}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                            { "bg-zinc-100": model.label === options.model.label }
                          )}
                          onClick={() => setOptions((prev) => ({ ...prev, model }))}
                        >
                          {
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4 opacity-0",
                                model.label === options.model.label && "opacity-100"
                              )}
                            />
                          }
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {[MATERIALS, FINISHES].map(({ name, options: selectableOpts }) => (
                  <RadioGroup
                    key={name}
                    value={options[name]}
                    onChange={(val) => setOptions((prev) => ({ ...prev, [name]: val }))}
                  >
                    <Label>{name.slice(0, 1).toUpperCase() + name.slice(1)}</Label>
                    <div className="mt-3 space-y-4">
                      {selectableOpts.map((option) => (
                        <Radio
                          key={option.value}
                          value={option}
                          className={({ checked }) => {
                            return cn(
                              "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                              { "border-primary": checked }
                            );
                          }}
                        >
                          <span className="flex items-center">
                            <span className="flex flex-col text-sm ">
                              <RGLabel className="font-medium text-gray-900 " as="span">
                                {option.label}
                              </RGLabel>

                              {option.description && (
                                <Description className="text-gray-500" as="span">
                                  <span className="block sm:inline">{option.description}</span>
                                </Description>
                              )}
                            </span>
                          </span>

                          <Description
                            as="span"
                            className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                          >
                            <span className="font-medium text-gray-900">
                              {formatPrice(option.price)}
                            </span>
                          </Description>
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(BASE_PRICE + options.finish.price + options.material.price)}
              </p>
              <Button
                onClick={() => saveConfiguration()}
                className="w-full"
                size="sm"
                disabled={isUploading}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div id="canvasDiv" ref={canvasDivRef}></div>
    </div>
  );
}

export default DesignConfiguration;
