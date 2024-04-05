/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { z } from "zod";
import { localChainFormSchema } from "~/app/(register)/register/local-chain/local-chain-form-schema";
import { jsonFetch } from "~/lib/shared-utils";
import { EventFor } from "~/lib/types";
import { Button } from "~/ui/button";
import {
  Camera,
  CheckCircleOutline,
  Link as LinkIcon,
  Loader,
  Warning,
} from "~/ui/icons";
import { Input } from "~/ui/input";
import { LoadingIndicator } from "~/ui/loading-indicator";
import { Select, SelectContent, SelectItem } from "~/ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/ui/shadcn/components/ui/alert";

const rpcStatusResponseSchema = z.object({
  result: z.object({
    sync_info: z.object({
      catching_up: z.boolean(),
      earliest_block_height: z.coerce.number(),
      latest_block_height: z.coerce.number(),
    }),
  }),
});

async function isFileAnImage(file: Blob) {
  const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result instanceof ArrayBuffer) {
        resolve(fileReader.result);
      }
    };
    fileReader.readAsArrayBuffer(file);
  });

  const first4Bytes = new Uint8Array(buffer).subarray(0, 4);
  let fileHeader = "";
  let mimeType: string | null = null;

  for (const byte of first4Bytes) {
    fileHeader += byte.toString(16);
  }

  switch (fileHeader) {
    case "89504e47": {
      mimeType = "image/png";
      break;
    }
    case "47494638": {
      mimeType = "image/gif";
      break;
    }
    case "52494646":
    case "57454250":
      mimeType = "image/webp";
      break;
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
      mimeType = "image/jpeg";
      break;
  }
  return mimeType !== null;
}

export type RegisterLocalChainFormProps = {};

async function readFileAsDataURL(file: File) {
  return await new Promise<string>((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result?.toString().indexOf("data:image/") === 0) {
        resolve(fileReader.result.toString());
      } else {
        toast.error("Error", {
          description: "The file you tried to upload is not an image",
        });
        reject(new Error("The file you tried to upload is not an image"));
      }
    };
    fileReader.readAsDataURL(file);
  });
}

export function RegisterLocalChainForm({}: RegisterLocalChainFormProps) {
  const [logoFileDataURL, setLogoFileDataURL] = React.useState<string | null>(
    null,
  );
  const [errors, action] = useFormState(formAction, null);
  const formRef = React.useRef<React.ElementRef<"form">>(null);
  const [isCheckingNetworkStatus, startNetworkStatusTransition] =
    React.useTransition();
  const [isSubmitting, startTransition] = React.useTransition();
  const [networkStatus, setNetworkStatus] = React.useState<{
    [rpcURL: string]: "HEALTHY" | "UNHEALTHY";
  } | null>(null);
  const [rpcUrl, setRPCUrl] = React.useState("");

  async function formAction(_: any, formData: FormData) {
    console.log("FORMACTION");
    if (formData.get("logo")) {
      if (formRef.current?.logo.files.length === 0) {
        // we do this because the logo will have a value even if we don't select any file,
        // so this way if there is truly no selected file, it returns `undefined`
        formData.delete("logo");
      } else {
        if (!(await isFileAnImage(formData.get("logo") as Blob))) {
          return {
            fieldErrors: null,
            formErrors: ["The file you tried to upload is not an image."],
          };
        }
      }
    }

    const parseResult = await localChainFormSchema.safeParseAsync(formData);
    if (parseResult.success) {
      const data = parseResult.data;

      console.log({ data, formData });
      startTransition(async () => {
        const res = await fetch("/api/local-chains", {
          body: formData,
          method: "POST",
          headers: {
            accept: "application/json",
          },
        });

        console.log({
          res,
        });
      });
    } else {
      return parseResult.error.flatten();
    }
  }

  async function fetchNetworkStatus(rpcURL: string) {
    try {
      await jsonFetch(new URL(`${rpcURL}/status`), {
        credentials: undefined,
      })
        .then((response) => rpcStatusResponseSchema.parse(response))
        .then(() => {
          setNetworkStatus({
            [rpcURL]: "HEALTHY",
          });
        });
    } catch (error) {
      setNetworkStatus({
        [rpcURL]: "UNHEALTHY",
      });
    }
  }

  const fieldErrors = errors?.fieldErrors as unknown as Record<
    string,
    string[] | undefined
  >;
  const formErrors = errors?.formErrors;
  console.log("RENDER", { fieldErrors });
  return (
    <form className="flex flex-col gap-4" ref={formRef} action={action}>
      {formErrors && formErrors?.length > 0 && (
        <Alert variant="danger">
          <Warning className="h-4 w-4 flex-none" aria-hidden="true" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formErrors}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-5 gap-3">
        <label className="flex items-center justify-center w-full h-full">
          <span className="sr-only">Logo</span>
          <input
            type="file"
            name="logo"
            id="logo"
            accept="image/*"
            className="sr-only peer"
            onChange={(e) => {
              if (e.currentTarget.files && e.currentTarget.files.length > 0) {
                readFileAsDataURL(e.currentTarget.files[0]).then(
                  setLogoFileDataURL,
                );
              }
            }}
          />
          <div
            aria-hidden="true"
            className="peer-focus:ring-2 peer-focus:border peer-focus:border-primary transition duration-150 rounded-full h-[4.25rem] w-[4.25rem] border bg-muted-100 flex items-center justify-center"
          >
            {logoFileDataURL ? (
              <img
                alt=""
                src={logoFileDataURL}
                className="object-cover object-center rounded-full w-full h-full"
              />
            ) : (
              <Camera className="w-4 h-4 text-muted" />
            )}
          </div>
        </label>

        <div className="col-span-2">
          <Input size="small" label="Brand" disabled defaultValue="Local" />
        </div>
        <div className="col-span-2">
          <Input
            size="small"
            label="Chain Name"
            type="text"
            placeholder="Mainnet"
            name="chainName"
            required
            defaultValue={""}
            autoFocus
            error={fieldErrors?.chainName}
          />
        </div>
      </div>

      <Input
        size="small"
        label="DA Layer (optional)"
        type="text"
        placeholder="00 11 446 694"
        name="daLayer"
        defaultValue={""}
        error={fieldErrors?.daLayer}
      />

      <Input
        size="small"
        label="Namespace (optional)"
        type="text"
        placeholder="00 11 446 694"
        name="namespace"
        defaultValue={""}
        error={fieldErrors?.namespace}
      />

      <Input
        size="small"
        label="Start Height (optional)"
        type="text"
        placeholder="353000"
        name="startHeight"
        error={fieldErrors?.startHeight}
      />

      <div className="grid grid-cols-6 place-items-start gap-3">
        <Select
          size="small"
          label="RPC"
          placeholder="Platform"
          name="rpcPlatform"
          defaultValue={"cosmos"}
          className="w-full flex-grow inline-flex col-span-2"
        >
          <SelectContent>
            <SelectItem value="cosmos">Cosmos</SelectItem>
          </SelectContent>
        </Select>
        <Input
          size="small"
          label="RPC URL"
          labelClassName="opacity-0"
          type="text"
          placeholder="https://..."
          className="col-span-4 px-2"
          name="rpcUrl"
          required
          error={fieldErrors?.rpcUrl}
          renderLeadingIcon={(cls) => (
            <LinkIcon className={cls} aria-hidden="true" />
          )}
          onChange={(e) => {
            setRPCUrl(e.currentTarget.value.trim());
            setNetworkStatus(null);
          }}
          onBlur={(e) => {
            const value = e.currentTarget.value.trim();
            if (value && networkStatus?.[value] !== "HEALTHY") {
              startNetworkStatusTransition(
                async () => await fetchNetworkStatus(value),
              );
            }
          }}
        />
      </div>

      {isCheckingNetworkStatus ? (
        <Alert variant="info" className="py-1.5 px-3">
          <AlertDescription className="flex justify-center gap-1 items-center">
            <span>Connecting</span>
            <Loader
              className="animate-spin text-blue-600 h-4 w-4"
              aria-hidden="true"
            />
          </AlertDescription>
        </Alert>
      ) : (
        networkStatus &&
        (networkStatus[rpcUrl] === "HEALTHY" ? (
          <Alert
            variant="success"
            className="py-1.5 px-3 flex gap-2 items-center"
          >
            <div className="h-full flex items-center">
              <CheckCircleOutline
                className="h-4 w-4 flex-none text-teal-500"
                aria-hidden="true"
              />
            </div>

            <AlertDescription className="flex justify-center gap-1 items-center">
              Connection successful. This node is healthy.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="danger" className="flex gap-2">
            <div className="h-full flex items-center">
              <Warning className="h-4 w-4 flex-none" aria-hidden="true" />
            </div>

            <AlertDescription className="flex flex-col gap-1">
              <span>Connection unsuccessful.</span>
              <span>Please ensure your node is online.</span>
            </AlertDescription>
          </Alert>
        ))
      )}

      <div className="grid grid-cols-2 gap-3">
        <Input
          size="small"
          label="Token"
          type="text"
          placeholder="TIA"
          name="tokenName"
          required
          error={fieldErrors?.tokenName}
        />

        <Input
          size="small"
          label="Decimals"
          type="text"
          placeholder="16"
          name="tokenDecimals"
          required
          error={fieldErrors?.tokenDecimals}
        />
      </div>

      <Button
        type="submit"
        color="primary"
        className="px-3 py-1 w-full md:w-auto text-center items-center justify-center gap-1 mt-6"
        onClick={(e: EventFor<"button", "onClick">) => {
          const form = e.currentTarget.form!;
          const formData = new FormData(form);
          const rpcUrl = formData.get("rpcUrl")?.toString().trim();
          console.log({ rpcUrl, networkStatus });
          if (rpcUrl && networkStatus?.[rpcUrl] !== "HEALTHY") {
            e.preventDefault();
            console.log("PREVENT DEFAULT");
            startNetworkStatusTransition(
              async () =>
                await fetchNetworkStatus(rpcUrl).then(() =>
                  form.requestSubmit(),
                ),
            );
          }
        }}
        aria-disabled={isSubmitting}
      >
        {isSubmitting && <LoadingIndicator className="text-white h-4 w-4" />}
        <span>Submit</span>
      </Button>
    </form>
  );
}
