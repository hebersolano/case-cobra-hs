import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import db from "@/db";
import { OptionsCaseT } from "@/lib/types";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1, minFileCount: 1 } })
    .input(
      z.object({
        configId: z.string().optional(),
        caseConfig: z.custom<OptionsCaseT>().optional(),
        imgDimensions: z
          .object({
            width: z.number(),
            height: z.number(),
          })
          .optional(),
      })
    )
    .middleware(async ({ input, files }) => {
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId, caseConfig, imgDimensions } = metadata.input;

      try {
        if (!configId) {
          // const buffer = await fetchImgBuffer(file.url);
          // const imgMetadata = await sharp(buffer).metadata();
          const { width, height } = imgDimensions!;

          const configuration = await db.configuration.create({
            data: { imgUrl: file.url, height: height || 500, width: width || 500 },
          });

          return { configId: configuration.id };
        } else {
          const updatedConfiguration = await db.configuration.update({
            where: {
              id: configId,
            },
            data: {
              croppedImgUrl: file.url,
              color: caseConfig?.color.value,
              model: caseConfig?.model.value!,
              material: caseConfig?.material.value,
              finish: caseConfig?.finish.value,
            },
          });

          return { configId: updatedConfiguration.id };
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
      // ! Whatever is returned here is sent to the client-side `onClientUploadComplete` callback
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
