import { COLORS, FINISHES, MATERIALS, MODELS } from "@/lib/validators/option-validator";

export type SearchParamsPageT = {
  searchParams: { [key: string]: string | undefined };
};

export type DesignPageProps = {
  configId: string;
  imgUrl: string;
  imgDimension: { width: number; height: number };
};

export type OptionsCaseT = {
  color: (typeof COLORS)[number];
  model: (typeof MODELS.options)[number];
  material: (typeof MATERIALS.options)[number];
  finish: (typeof FINISHES.options)[number];
};
