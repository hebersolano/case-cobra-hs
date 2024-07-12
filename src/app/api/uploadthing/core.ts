import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import sharp from "sharp";
import db from "@/db";
import { OptionsStateT } from "@/app/configure/design/DesignConfigurator";
import { error } from "console";
import { url } from "inspector";
import { fetchImgBuffer } from "@/lib/utils";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(
      z.object({
        configId: z.string().optional(),
        caseConfig: z.custom<OptionsStateT>().optional(),
      })
    )
    .middleware(async ({ input }) => {
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;

      console.log("img url", file.url);
      // const res = await fetch(file.url);
      // const buffer = await res.arrayBuffer();
      const buffer = await fetchImgBuffer(file.url);

      const imgMetadata = await sharp(buffer).metadata();
      const { width, height } = imgMetadata;

      if (!configId) {
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
          },
        });

        return { configId: updatedConfiguration.id };
      }

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
