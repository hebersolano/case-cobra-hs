import Image from "next/image";
import { Check, Star } from "lucide-react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import snake01 from "@/../public/snake-1.png";
import yourImage from "@/../public/your-image.png";
import lineImg from "@/../public/line.png";
import testimonial01 from "@/../public/testimonials/1.jpg";
import user01 from "@/../public/users/user-1.png";
import user02 from "@/../public/users/user-2.png";
import user03 from "@/../public/users/user-3.png";
import user04 from "@/../public/users/user-4.jpg";
import Phone from "@/components/Phone";

function HeroSection() {
  return (
    <section>
      <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
        <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
          <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="absolute w-28 left-0 -top-20 hidden lg:block">
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
              <Image className="w-full" src={snake01} alt="logo-cobra-case" />
            </div>

            <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
              Your Image on a <span className="bg-green-600 text-white px-2">Custom</span> Phone
              Case
            </h1>

            <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
              Capture your favorite memories with your own,{" "}
              <span className="font-semibold">one-of-one</span> phone case. CaseCobra allows you to
              protect your memories, not just your phone
            </p>

            <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
              <div className="space-y-2">
                <li className="flex gap-1.5 items-center text-left">
                  <Check className="h-5 w-5 shrink-0 text-green-600" /> High-quality, durable
                  material
                </li>
                <li className="flex gap-1.5 items-center text-left">
                  <Check className="h-5 w-5 shrink-0 text-green-600" /> 5 year print guarantee
                </li>
                <li className="flex gap-1.5 items-center text-left">
                  <Check className="h-5 w-5 shrink-0 text-green-600" /> Modern IPhone models
                  supported
                </li>
              </div>
            </ul>

            <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="flex -space-x-4">
                <Image
                  src={user01}
                  alt="user image"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                />
                <Image
                  src={user02}
                  alt="user image"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                />
                <Image
                  src={user03}
                  alt="user image"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                />
                <Image
                  src={user04}
                  alt="user image"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                />
              </div>

              <div className="flex flex-col justify-between items-center sm:items-start">
                <div className="flex gap-0.5">
                  <Star className="h-4 w-4 text-green-600 fill-green-600" />
                  <Star className="h-4 w-4 text-green-600 fill-green-600" />
                  <Star className="h-4 w-4 text-green-600 fill-green-600" />
                  <Star className="h-4 w-4 text-green-600 fill-green-600" />
                  <Star className="h-4 w-4 text-green-600 fill-green-600" />
                </div>
              </div>

              <p>
                <span>1.250</span> happy customers
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
          <div className="relative md:max-w-xl">
            <Image
              src={yourImage}
              alt="example of your image on a case"
              className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
            />
            <Image src={lineImg} alt="" className="absolute w-20 -left-6 -bottom-6 select-none" />
            <Phone className="w-64" imgSrc={testimonial01} />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default HeroSection;
