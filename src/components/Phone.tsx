"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

import phoneTemplate from "@/../public/phone-template.png";
import phoneTemplateWhiteEdges from "@/../public/phone-template-white-edges.png";
import phoneTemplateDarkEdges from "@/../public/phone-template-dark-edges.png";
import { useTheme } from "next-themes";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: StaticImageData | string;
  setTheme?: "light" | "dark" | undefined;
}

function Phone({ imgSrc, setTheme, className, ...props }: PhoneProps) {
  const { theme, resolvedTheme } = useTheme();
  const [phoneSrc, setPhoneSrc] = useState(phoneTemplateWhiteEdges);
  const imgRef = useRef(null);
  console.log(theme, resolvedTheme);

  useEffect(
    function () {
      if (setTheme) {
        if (setTheme === "light") setPhoneSrc(phoneTemplateWhiteEdges);
        if (setTheme === "dark") setPhoneSrc(phoneTemplateDarkEdges);
      } else {
        if (resolvedTheme === "dark") setPhoneSrc(phoneTemplateDarkEdges);
      }
    },
    [resolvedTheme, setTheme]
  );

  return (
    <div className={cn("relative pointer-events-none z-50 overflow-hidden ", className)} {...props}>
      <Image
        ref={imgRef}
        src={phoneSrc}
        alt="phone image"
        className="pointer-events-none z-50 select-none"
      />
      <div className="absolute -z-10 inset-0">
        <Image fill src={imgSrc} className="object-cover" alt="overlaying phone image" />
      </div>
    </div>
  );
}

export default Phone;
