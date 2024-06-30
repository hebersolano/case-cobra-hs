"use client";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useRef } from "react";
import { useInView } from "framer-motion";

import whatPeopleAreBuying from "@/../public/what-people-are-buying.png";
import testimonial01 from "@/../public/testimonials/1.jpg";
import testimonial02 from "@/../public/testimonials/2.jpg";
import testimonial03 from "@/../public/testimonials/3.jpg";
import testimonial04 from "@/../public/testimonials/4.jpg";
import testimonial05 from "@/../public/testimonials/5.jpg";
import testimonial06 from "@/../public/testimonials/6.jpg";

const PHONES = [
  testimonial01,
  testimonial02,
  testimonial03,
  testimonial04,
  testimonial05,
  testimonial06,
];

export default function Reviews() {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <Image
        src={whatPeopleAreBuying}
        alt="what people are buying"
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      />
    </MaxWidthWrapper>
  );
}

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(PHONES, 3);
  const column01 = columns[0];
  const column02 = columns[1];
  const column03 = splitArray(columns[2], 2);

  return (
    <div className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"></div>
  );
}

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }

  return result;
}
