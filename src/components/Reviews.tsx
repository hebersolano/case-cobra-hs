"use client";
import Image, { StaticImageData } from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

import whatPeopleAreBuying from "@/../public/what-people-are-buying.png";
import testimonial01 from "@/../public/testimonials/1.jpg";
import testimonial02 from "@/../public/testimonials/2.jpg";
import testimonial03 from "@/../public/testimonials/3.jpg";
import testimonial04 from "@/../public/testimonials/4.jpg";
import testimonial05 from "@/../public/testimonials/5.jpg";
import testimonial06 from "@/../public/testimonials/6.jpg";
import { cn } from "@/lib/utils";
import Phone from "./Phone";

export default function Reviews() {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <Image
        src={whatPeopleAreBuying}
        alt="what people are buying"
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      />
      <ReviewGrid />
    </MaxWidthWrapper>
  );
}

const PHONES = [
  testimonial01,
  testimonial02,
  testimonial03,
  testimonial04,
  testimonial05,
  testimonial06,
];

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  const columns = splitArray(PHONES, 3);
  const column01 = columns[0];
  const column02 = columns[1];
  const column03 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...column01, ...column03.flat(), ...column02]}
            reviewClassName={(reviewIndex) =>
              cn({
                "md:hidden": reviewIndex >= column01.length + column03[0].length,
                "lg:hidden": reviewIndex >= column01.length,
              })
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column02, ...column03[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) => (reviewIndex >= column02.length ? "lg:hidden" : "")}
            msPerPixel={15}
          />
          <ReviewColumn reviews={column03.flat()} className="hidden md:block" msPerPixel={10} />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
    </div>
  );
}

type ReviewColumnType = {
  reviews: string[] | StaticImageData[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
};

function ReviewColumn({ reviews, className, reviewClassName, msPerPixel = 0 }: ReviewColumnType) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);

  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return function () {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
        <Review
          key={reviewIndex}
          imgSrc={imgSrc}
          className={reviewClassName?.(reviewIndex % reviews.length)}
        />
      ))}
    </div>
  );
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string | StaticImageData;
}

const POSSIBLE_ANIMATION_DELAYS = ["0s", "0.1s", "0.3s", "0.4s", "0.5s"];

function Review({ imgSrc, className, ...props }: ReviewProps) {
  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)];

  return (
    <div
      className={cn(
        "animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0  shadow-xl shadow-slate-900/5",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <Phone imgSrc={imgSrc} />
    </div>
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
