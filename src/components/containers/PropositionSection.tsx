import Image from "next/image";
import { Check, Star } from "lucide-react";

import snake02 from "@/../public/snake-2.png";
import user01 from "@/../public/users/user-1.png";
import user04 from "@/../public/users/user-4.jpg";
import { Icons } from "../ui/Icons";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Reviews from "../Reviews";

function PropositionSection() {
  return (
    <section className="bg-background-second py-24">
      <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
        <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
          <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl">
            What our{" "}
            <span className="relative px-2">
              customers
              <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500 " />
            </span>
            say
          </h2>
          <Image src={snake02} alt="snake logo" className="w-24 order-0 lg:order-2" />
        </div>

        <div className="bg-background-second mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
          {/* review 01 */}
          <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
            <div className="flex gap-0.5 mb-2">
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
            </div>

            <div className="text-lg leading-8">
              <p>
                &quot;The case feels durable and I even got a compliment on the design. Had the case
                for two and a half months now and{" "}
                <span className="p-0.5 text-background-second bg-foreground">
                  the image is super clear.
                </span>
                , on the case I had before, the image started fading into yellow-ish color after a
                couple of weeks. Love it.&quot;
              </p>
            </div>

            <div className="flex gap-4 mt-2">
              <Image src={user01} alt="user-01" className="rounded-full h-12 w-12 object-cover" />
              <div className="flex flex-col">
                <p className="font-semibold">Jonathan</p>
                <div className="flex gap 1.5 items-center text-zinc-600">
                  <Check className="h-4 w-4 stroke-[3px] text-green-600 " />
                  <p className="text-sm text-muted-foreground">Verified Purchase</p>
                </div>
              </div>
            </div>
          </div>

          {/* review 02 */}
          <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
            <div className="flex gap-0.5 mb-2">
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
            </div>

            <div className="text-lg leading-8">
              <p>
                &quot;I usually keep my phone together with my keys in my pocket and led to some
                pretty heavy scratch marks on all of my last phone cases. This one, besides a barely
                noticeable scratch on the corner,{" "}
                <span className="p-0.5 bg-foreground text-background-second">
                  looks brand new after about half a year
                </span>
                . I dig it. &quot;
              </p>
            </div>

            <div className="flex gap-4 mt-2">
              <Image src={user04} alt="user-01" className="rounded-full h-12 w-12 object-cover" />
              <div className="flex flex-col">
                <p className="font-semibold">Carlos</p>
                <div className="flex gap 1.5 items-center text-zinc-600">
                  <Check className="h-4 w-4 stroke-[3px] text-green-600 " />
                  <p className="text-sm text-muted-foreground">Verified Purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <div className="pt-16">
        <Reviews />
      </div>
    </section>
  );
}

export default PropositionSection;
