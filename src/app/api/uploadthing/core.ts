import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import db from "@/db";
import { OptionsCaseT } from "@/lib/types";
import createCaseConfigurationUC from "@/use-cases/create-case-configuration-UC";
import createCaseConfigurationDA from "@/data-access/create-case-configuration-DA";

const fileUploader = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: fileUploader({ image: { maxFileSize: "4MB", maxFileCount: 1, minFileCount: 1 } })
    .input(
      z.object({
        imgDimensions: z.object({
          width: z.number(),
          height: z.number(),
        }),
      })
    )
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { imgDimensions } = metadata.input;
      const { url } = file;

      const { configId } = await createCaseConfigurationUC(
        { createCaseConfigurationDA },
        { imgUrl: url, imgDimensions }
      );

      return { configId };
    }),

  croppedImgUploader: fileUploader({
    image: { maxFileSize: "4MB", maxFileCount: 1, minFileCount: 1 },
  })
    .input(
      z.object({
        configId: z.string(),
        caseConfig: z.custom<OptionsCaseT>(),
      })
    )
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId, caseConfig } = metadata.input;

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
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
