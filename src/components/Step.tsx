import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

type StepType = {
  step: { name: string; description: string; url: string; img: string | StaticImageData };
  index: number;
  isCompleted: boolean;
  isCurrent: boolean;
};

function Step({ step, index, isCompleted, isCurrent }: StepType) {
  return (
    <li key={step.name} className="relative overflow-hidden lg:flex-1 ">
      <div>
        <span
          className={cn(
            "absolute left-0 top-0 h-full w-1 bg-zinc-400 md:bottom-0 md:top-auto md:h-1 md:w-full",
            { "bg-zinc-700": isCurrent, "bg-primary": isCompleted }
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            index !== 0 && "lg:pl-9",
            "flex items-center px-6 py-4 text-sm font-medium"
          )}
        >
          <span className="flex-shrink-0">
            <Image
              src={step.img}
              alt="step image"
              className={cn("flex h-20 w-20 object-contain items-center justify-center", {
                "border-zinc-700": isCurrent,
                "border-none": isCompleted,
              })}
            />
          </span>
          <span className="ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center">
            <span
              className={cn("text-sm font-semibold text-zinc-700 ", {
                "text-zinc-700": isCurrent,
                "text-primary": isCompleted,
              })}
            >
              {step.name}
            </span>
            <span className="text-sm text-zinc-500">{step.description}</span>
          </span>
        </span>

        {/* separator */}
        {index !== 0 && (
          <div className="absolute inset-0 hidden w-3">
            <svg
              className="h-full w-full text-gray-300"
              viewBox="0 0 12 82"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5 0V31L10.5 41L0.5 51V82"
                stroke="currentcolor"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        )}
      </div>
    </li>
  );
}

export default Step;
