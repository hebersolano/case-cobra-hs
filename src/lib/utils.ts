import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import pRetry, { AbortError } from "p-retry";
import { Metadata } from "next";
import { isCuid } from "@paralleldrive/cuid2";
import { Configuration } from "@prisma/client";
import { BASE_PRICE, PRODUCT_PRICE } from "@/config/products";
import { COLORS, MODELS } from "./validators/option-validator";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price / 100);
}

export async function fetchImgBuffer(url: string) {
  return await pRetry(
    async function () {
      const response = await fetch(url);

      // Abort retrying if the resource doesn't exist
      if (response.status === 404) {
        throw new AbortError(response.statusText);
      }

      return await response.arrayBuffer();
    },
    { retries: 3 }
  );
}

export function dataURLtoFile(dataURL: string, fileName: string) {
  let mimeType = dataURL.split(",")[0].split(":")[1].split(";")[0];

  return fetch(dataURL)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], fileName, { type: mimeType });
    });
}

// export function dataURLtoFile(dataurl: string, filename: string) {
//   let arr = dataurl.split(","),
//     mime = arr[0].match(/:(.*?);/)[1],
//     bstr = atob(arr[arr.length - 1]),
//     n = bstr.length,
//     u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename, { type: mime });
// }

type Roles = {
  name: string;
  value:
    | {
        id: string;
        key: string;
        name: string;
      }[]
    | string;
} | null;

export function checkIsAdmin(roles: Roles): boolean {
  if (roles?.name !== "roles") return false;
  if (typeof roles.value === "string" && roles.value === "admin") return true;
  if (typeof roles.value === "object" && roles.value instanceof Array) {
    return roles.value.some((role) => role.key === "admin");
  } else return false;
}

type MetadataConstructor = {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
};

export function metadataConstructor({
  title = "CaseCobra - Custom high quality phone cases",
  description = "Create custom high-quality phone cases in seconds",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
}: MetadataConstructor = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      // creator: "@nextjs",
    },
    icons,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL!),
  };
}

// export async function getDimensionsFromImgFile(imgFile: File) {
//   const imgArrBuffer = await imgFile.arrayBuffer();
//   const imgMetadata = await sharp(imgArrBuffer).metadata();
//   if (!imgMetadata.width || !imgMetadata.height) throw new Error("Error processing image data");
//   return { width: imgMetadata.width, height: imgMetadata.height };
// }

export function getDimensionsFromImgFile(
  imgFile: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgDataURL = event?.target?.result;

        const userImg = new Image();
        userImg.crossOrigin = "anonymous";
        userImg.src = imgDataURL as string;
        userImg.onload = (event) => {
          const imgElement = event.target as HTMLImageElement;

          resolve({ width: imgElement.naturalWidth, height: imgElement.naturalHeight });
        };
      };

      reader.readAsDataURL(imgFile);
    } catch {
      resolve({ width: 0, height: 0 });
    }
  });
}

export function isValidId(id: string): boolean {
  return isCuid(id);
}

export function getOrderPrice(caseConfiguration: Configuration) {
  const { finish, material } = caseConfiguration;
  let orderTotalPrice = BASE_PRICE;
  if (material === "polycarbonate") orderTotalPrice += PRODUCT_PRICE.material.polycarbonate;
  if (finish === "textured") orderTotalPrice += PRODUCT_PRICE.finish.textured;

  return orderTotalPrice;
}

export function getCaseConfigLabels(caseConfiguration: Configuration) {
  const caseColor = COLORS.find(
    (supportedColors) => supportedColors.value === caseConfiguration.color
  );
  const phoneModel = MODELS.options.find(
    (supportedModels) => supportedModels.value === caseConfiguration.model
  )?.label;

  return { caseColor, phoneModel };
}
