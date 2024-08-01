"use client";

import { usePathname } from "next/navigation";

import imgStep01 from "@/../public/snake-1.png";
import imgStep02 from "@/../public/snake-2.png";
import imgStep03 from "@/../public/snake-3.png";

import Step from "./Step";

const STEPS = [
  {
    name: "Step 1: Add image",
    description: "Choose and image for your case",
    url: "/upload",
    img: imgStep01,
  },
  {
    name: "Step 2: Customize design",
    description: "Make the case yours",
    url: "/design",
    img: imgStep02,
  },
  {
    name: "Step 1: Summary",
    description: "Review your final design",
    url: "/preview",
    img: imgStep03,
  },
];

export default function Steps() {
  const pathname = usePathname();

  return (
    <ol className=" rounded-md md:flex">
      {STEPS.map((step, i) => {
        const isCurrent = pathname.endsWith(step.url);
        const isCompleted = STEPS.slice(i + 1).some((step) => pathname.endsWith(step.url));

        return (
          <Step
            key={step.name}
            step={step}
            index={i}
            isCompleted={isCompleted}
            isCurrent={isCurrent}
          />
        );
      })}
    </ol>
  );
}
