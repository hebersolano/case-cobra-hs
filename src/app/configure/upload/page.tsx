"use client";

import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { ImageDown, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { PHONE_CASE } from "@/lib/validators/option-validator";

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
      description: "Please choose a PNG, JPG, OR JPEG image instead",
      variant: "destructive",
    });
  }

  function dropAcceptedHandler(acceptedFiles: File[]) {
    // TODO: get the files dimensions
    startUpload(acceptedFiles, {
      configId: undefined,
      imgDimensions: { width: PHONE_CASE.width, height: PHONE_CASE.height },
    });
    setIsDrayOver(false);
  }

  return (
    <div
      className={cn(
        "relative h-full flex flex-1 justify-center flex-col items-center my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl ",
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
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
                className="h-full w-full flex-1 flex flex-col items-center justify-center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                {isDragOver ? (
                  <MousePointerSquareDashed />
                ) : isUploading || isPending ? (
                  <Loader2 className="animate-spin h-6 w-6" />
                ) : (
                  <ImageDown className="h-6 w-6 text-zinc-500 mb-2" />
                )}

                <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <p>Uploading...</p>
                      <Progress value={uploadProgress} className="mt-2 w-40 h-2 bg-gray-300" />
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

                {!isPending && <p className="text-sm text-zinc-500">PNG, JPG, JPEG</p>}
              </div>
            );
          }}
        </Dropzone>
      </div>
    </div>
  );
}

export default UploadPage;
