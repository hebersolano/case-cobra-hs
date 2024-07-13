import Phone from "@/components/Phone";
import { DesignPageProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { COLORS } from "@/validators/option-validator";
import { Configuration } from "@prisma/client";

function DesignPreview({ userConfig }: { userConfig: Configuration }) {
  const { croppedImgUrl, color } = userConfig;
  const { tw } = COLORS.find((supportedColors) => supportedColors.value === color);
  console.log(tw);
  return (
    <div className="mt-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
      <div className="sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2">
        <Phone imgSrc={croppedImgUrl!} className={cn(`bg-${tw}`)} />
      </div>
    </div>
  );
}

export default DesignPreview;
