/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { z } from "zod";
import { localChainFormSchema } from "~/app/(register)/register/local-chain/local-chain-form-schema";
import { jsonFetch } from "~/lib/shared-utils";
import { Button } from "~/ui/button";
import {
  Camera,
  CheckCircle,
  Link as LinkIcon,
  Loader,
  Warning,
  Wifi,
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
  async function formAction(_: any, formData: FormData) {
    const parseResult = await localChainFormSchema.safeParseAsync({
      ...Object.fromEntries(formData.entries()),
      logo:
        formRef.current?.logo.files.length > 0
          ? formRef.current?.logo.files[0]
          : null,
    });
    if (parseResult.success) {
      console.log({ data: parseResult.data });
    } else {
      return parseResult.error.flatten();
    }
  }

  const [logoFileDataURL, setLogoFileDataURL] = React.useState<string | null>(
    null,
  );
  const [errors, action] = useFormState(formAction, null);
  const formRef = React.useRef<React.ElementRef<"form">>(null);
  const [isCheckingNetworkStatus, startNetworkStatusTransition] =
    React.useTransition();
  const [networkStatus, setNetworkStatus] = React.useState<
    "HEALTHY" | "UNHEALTHY" | null
  >(null);

  const fieldErrors = errors?.fieldErrors;
  const formErrors = errors?.formErrors;

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
          onChange={() => setNetworkStatus(null)}
          onBlur={(e) => {
            const value = e.currentTarget.value;
            if (value.trim()) {
              startNetworkStatusTransition(async () => {
                try {
                  await jsonFetch(new URL(`${value}/status`), {
                    credentials: undefined,
                  })
                    .then((response) => rpcStatusResponseSchema.parse(response))
                    .then(() => {
                      setNetworkStatus("HEALTHY");
                    });
                } catch (error) {
                  // do nothing...
                  setNetworkStatus("UNHEALTHY");
                }
              });
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
        (networkStatus === "HEALTHY" ? (
          <Alert
            variant="success"
            className="py-1.5 px-3 flex gap-2 items-center"
          >
            <div className="h-full flex items-center">
              <CheckCircle
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
      >
        {/* <LoadingIndicator className="text-white h-4 w-4" /> */}
        <span>Submit</span>
      </Button>
    </form>
  );
}
