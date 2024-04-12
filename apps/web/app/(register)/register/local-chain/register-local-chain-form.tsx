/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { z } from "zod";
import { localChainFormSchema } from "./local-chain-schema";
import type { SingleNetwork } from "~/lib/network";
import { jsonFetch } from "~/lib/shared-utils";
import { EventFor } from "~/lib/types";
import { Button } from "~/ui/button";
import {
  Camera,
  CheckCircleOutline,
  Home2,
  Link as LinkIcon,
  Loader,
  Warning,
} from "~/ui/icons";
import { Input } from "~/ui/input";
import { Select, SelectContent, SelectItem } from "~/ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/ui/shadcn/components/ui/alert";
import { cn } from "~/ui/shadcn/utils";

const rpcStatusResponseSchema = z.object({
  result: z.object({
    sync_info: z.object({
      catching_up: z.boolean(),
      earliest_block_height: z.coerce.number(),
      latest_block_height: z.coerce.number(),
    }),
  }),
});

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

export function RegisterLocalChainForm() {
  const [logoFileDataURL, setLogoFileDataURL] = React.useState<string | null>(
    null,
  );
  const [status, action] = useFormState(formAction, null);
  const formRef = React.useRef<React.ElementRef<"form">>(null);
  const [isCheckingNetworkStatus, startNetworkStatusTransition] =
    React.useTransition();
  const [networkStatus, setNetworkStatus] = React.useState<{
    [rpcURL: string]: "HEALTHY" | "UNHEALTHY";
  } | null>(null);
  const [rpcUrl, setRPCUrl] = React.useState("");
  const router = useRouter();

  async function formAction(_: any, formData: FormData) {
    const parseResult = localChainFormSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );
    if (parseResult.success) {
      const data = parseResult.data;
      const res = await jsonFetch<{
        success: boolean;
        data: SingleNetwork;
      }>("/api/local-chains", {
        body: data,
        method: "POST",
      });

      router.refresh();
      return res;
    } else {
      return parseResult.error.flatten();
    }
  }

  function checkForNetworkStatusBeforeSubmission(
    event: EventFor<"button", "onClick">,
  ) {
    const form = event.currentTarget.form!;
    const formData = new FormData(form);
    const rpcUrl = formData.get("rpcUrl")?.toString().trim();
    if (rpcUrl && networkStatus?.[rpcUrl] !== "HEALTHY") {
      event.preventDefault();
      startNetworkStatusTransition(
        async () =>
          await fetchNetworkStatus(rpcUrl).then(() => form.requestSubmit()),
      );
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

  if (status && "data" in status && status?.data) {
    return <SuccessStep network={status.data as SingleNetwork} />;
  }

  const fieldErrors =
    status && "fieldErrors" in status ? status?.fieldErrors : null;
  const formErrors =
    status && "formErrors" in status ? status?.formErrors : null;
  console.log("RENDER", { fieldErrors, formErrors });
  return (
    <form className="flex flex-col gap-4" ref={formRef} action={action}>
      <div className="flex flex-col items-center gap-3 mb-4">
        <img
          src="/images/mc-logo.svg"
          alt="Modular Cloud logo"
          className="h-8 w-8 mb-3"
        />
        <h1 className="font-medium text-2xl">Register a Local chain</h1>
      </div>

      {(formErrors && formErrors?.length > 0) ||
        (fieldErrors?.logo && (
          <Alert variant="danger">
            <Warning className="h-4 w-4 flex-none" aria-hidden="true" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {formErrors}
              {fieldErrors?.logo}
            </AlertDescription>
          </Alert>
        ))}

      <div className="grid grid-cols-5 gap-3">
        <label className="flex items-center justify-center w-full h-full">
          <span className="sr-only">Logo</span>
          <input
            type="file"
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
              <>
                <img
                  alt=""
                  src={logoFileDataURL}
                  className="object-cover object-center rounded-full w-full h-full"
                />
                <input type="hidden" name="logo" value={logoFileDataURL} />
              </>
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

      <SubmitButton onClick={checkForNetworkStatusBeforeSubmission} />
    </form>
  );
}

function SuccessStep({ network }: { network: SingleNetwork }) {
  const router = useRouter();
  const [isNavigating, startTransition] = React.useTransition();

  // Prefetch the route to make it faster to navigate to it
  React.useEffect(() => {
    router.prefetch(`/${network.slug}`);
  }, [router, network.slug]);

  return (
    <div className="h-full w-full fixed inset-0">
      <div
        className={cn(
          "absolute flex flex-col gap-4 w-[20rem] md:w-[30rem]",
          "animate-slide-up-from-bottom top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        )}
      >
        <div
          className={cn(
            "",
            "border border-mid-dark-100 bg-muted-100 px-8 py-6 rounded-md ",
          )}
        >
          <img
            src="/images/bg-btn.svg"
            className="absolute left-0 top-0 right-0"
            alt=""
          />
          <div className="flex items-center gap-2 md:mx-10">
            <span className="text-2xl">🎈</span>
            <div className="flex flex-col">
              <p className="relative z-10 font-medium">
                You have successfully registered Local Blockchain !
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            color="primary"
            onClick={() =>
              startTransition(() => router.push(`/${network.slug}`))
            }
            variant="bordered"
            className="flex-1 inline-flex justify-center gap-1"
          >
            <span>
              {isNavigating ? (
                <Loader
                  className="animate-spin text-white h-4 w-4"
                  aria-hidden="true"
                />
              ) : (
                <Home2 className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
              )}
            </span>
            <span>Go to your chain&rsquo;s homepage </span>
          </Button>
        </div>
      </div>

      <img
        src="/images/confetti_left.svg"
        alt=""
        className="absolute -left-4 -bottom-4 animate-slide-up-from-left"
      />
      <img
        src="/images/confetti_right.svg"
        alt=""
        className="absolute -right-4 -bottom-4 animate-slide-up-from-right"
      />
    </div>
  );
}

function SubmitButton({
  onClick,
}: {
  onClick: (e: EventFor<"button", "onClick">) => void;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      color="primary"
      className="px-3 py-1 w-full md:w-auto text-center items-center justify-center gap-1 mt-6"
      onClick={onClick}
      aria-disabled={pending}
    >
      {pending && (
        <Loader
          className="animate-spin text-white h-4 w-4"
          aria-hidden="true"
        />
      )}
      <span>Submit</span>
    </Button>
  );
}
