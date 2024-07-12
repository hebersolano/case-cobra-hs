import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import pRetry, { AbortError } from "p-retry";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
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

export function dataURLtoFile(dataurl: string, filename: string) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function srcToFile(src: string, fileName: string, mimeType?: string) {
  let mimeString = src.split(",")[0].split(":")[1].split(";")[0];
  console.log(mimeString, "mimetype");
  return fetch(src)
    .then(function (res) {
      console.log(res);
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], fileName, { type: mimeString });
    });
}
