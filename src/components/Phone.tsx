import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import Image from "next/image";

import phoneTemplateWhiteEdges from "@/../public/phone-template-white-edges.png";
import phoneTemplateDarkEdges from "@/../public/phone-template-dark-edges.png";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

function Phone({ imgSrc, dark = false, className, ...props }: phoneProps) {
  return (
    <div className={cn("relative pointer-events-none z-50 overflow-hidden", className)} {...props}>
      <Image
        src={dark ? phoneTemplateDarkEdges : phoneTemplateWhiteEdges}
        alt="phone image"
        className="pointer-events-none z-50 select-none"
      />
    </div>
  );
}

export default Phone;
