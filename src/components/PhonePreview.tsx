"use client";

import { CaseColor } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Image from "next/image";
import clearPhone from "@/../public/clearphone.png";

function PhonePreview({ croppedImgUrl, color }: { croppedImgUrl: string; color: CaseColor }) {
  const aspectRef = useRef<HTMLDivElement>(null);
  const [phoneDimensions, setPhoneDimensions] = useState({ height: 0, width: 0 });

  useEffect(function () {
    function handleResize() {
      if (!aspectRef.current) return;
      const { width, height } = aspectRef.current.getBoundingClientRect();
      setPhoneDimensions({ width, height });
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let caseBgColor = "bg-zinc-950";
  if (color === "blue") caseBgColor = "bg-blue-950";
  if (color === "rose") caseBgColor = "bg-rose-950";

  return (
    <AspectRatio ref={aspectRef} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left: phoneDimensions.width / 2 - phoneDimensions.width / (1216 / 121),
          top: phoneDimensions.height / 6.22,
        }}
      >
        <img
          width={phoneDimensions.width / (3000 / 637)}
          src={croppedImgUrl}
          alt="case image design"
          className={cn(
            "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
            caseBgColor
          )}
        />
      </div>

      <div className="relative h-full w-full z-40">
        <Image
          src={clearPhone}
          alt="phone hold by a hand"
          className="pointer-events-none h-full w-full antialiased rounded-md"
        />
      </div>
    </AspectRatio>
  );
}

export default PhonePreview;
