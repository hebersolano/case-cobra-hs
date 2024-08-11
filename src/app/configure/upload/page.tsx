"use client";

import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { cn, getDimensionsFromImgFile } from "@/lib/utils";
import { ImageDown, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function UploadPage() {
  const { toast } = useToast();
  const [isDragOver, setIsDrayOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  function dropRejectedHandler(rejectedFiles: FileRejection[]) {
    const [file] = rejectedFiles;

    setIsDrayOver(false);

    toast({
      title: `${file.file.type} type is not supported`,
      description: "Please choose a PNG, JPG, JPEG or WEBP image instead",
      variant: "destructive",
    });
  }

  async function dropAcceptedHandler(acceptedFiles: File[]) {
    try {
      const imgDimensions = await getDimensionsFromImgFile(acceptedFiles[0]);
      if (!imgDimensions.width || !imgDimensions.height) throw new Error();

      startUpload(acceptedFiles, {
        imgDimensions,
      });
      setIsDrayOver(false);
    } catch {
      toast({
        title: `Error processing ${acceptedFiles[0].name} image`,
        description: "Please try later o try another image",
        variant: "destructive",
      });
    }
  }

  return (
    <div
      className={cn(
        "py-16 md:py-0 relative h-full flex flex-1 justify-center flex-col items-center my-16 w-full rounded-xl bg-background-second ring-1 ring-inset ring-border lg:rounded-2xl cursor-pointer",
        {
          "ring-2 ring-primary": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          maxFiles={1}
          onDropAccepted={dropAcceptedHandler}
          onDropRejected={dropRejectedHandler}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
            "image/webp": [".webp"],
          }}
          disabled={isUploading}
          onDragEnter={() => setIsDrayOver(true)}
          onDragLeave={() => setIsDrayOver(false)}
        >
          {({ getRootProps, getInputProps }) => {
            return (
              <div
                className="h-full w-full flex-1 flex flex-col items-center justify-center text-muted-foreground"
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                {isDragOver ? (
                  <MousePointerSquareDashed className="h-6 w-6 mb-2" />
                ) : isUploading || isPending ? (
                  <Loader2 className="animate-spin h-6 w-6 mb-2" />
                ) : (
                  <ImageDown className="h-6 w-6 mb-2" />
                )}

                <div className="flex flex-col justify-center mb-2 text-sm">
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <p>Uploading...</p>
                      <Progress value={uploadProgress} className="mt-2 w-40 h-2 bg-foreground" />
                    </div>
                  ) : isPending ? (
                    <div className="flex flex-col items-center">
                      <p>Redirecting, please wait...</p>
                    </div>
                  ) : isDragOver ? (
                    <p>
                      <span className="font-semibold">Drop File</span> to upload
                    </p>
                  ) : (
                    <p>
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  )}
                </div>

                {!isPending && (
                  <p className="text-sm text-muted-foreground/70">PNG, JPG, JPEG, WEBP</p>
                )}
              </div>
            );
          }}
        </Dropzone>
      </div>
    </div>
  );
}

export default UploadPage;
