/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { useFormState } from "react-dom";
import { Button } from "~/ui/button";
import {
  ArrowRight,
  Building,
  Enveloppe,
  GithubLogo,
  Warning,
} from "~/ui/icons";
import { Input } from "~/ui/input";
import { preprocess, z } from "zod";
import { Stepper } from "./stepper";
import { ImageCheckbox } from "./image-checkbox";
import { cn } from "../shadcn/utils";

export type RegisterFormProps = {};

const STEPS = [
  "DETAILS",
  "ENVIRONMENT",
  "TOOLKIT",
  "LAYER",
  "SUMMARY",
  "SUCCESS",
] as const;
type Step = (typeof STEPS)[number];

const detailStepSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({
      message: "Can't be empty!",
    })
    .email({
      message: "Please enter a correct email",
    }),
  projectName: z.string().trim().nonempty({
    message: "Can't be empty!",
  }),
  githubRepo: z
    .string()
    .trim()
    .refine(
      (val) => {
        // allow empty
        if (!val) return true;
        try {
          if (!val.startsWith("https://")) val = `https://${val}`;

          const url = new URL(val);
          return (
            url.toString().startsWith("https://github.com/") ||
            url.toString().startsWith("github.com/")
          );
        } catch (error) {
          return false;
        }
      },
      {
        message:
          "please enter a correct URL, hint: it should start with https://github.com/",
      },
    ),
});

const envStepSchema = z.object({
  env: z.array(z.string().trim().nonempty()).nonempty({
    message: "Choose one or more environments",
  }),
});

const toolkitStepSchema = z.object({
  toolkit: z
    .string({
      required_error: "Please select one toolkit",
    })
    .trim()
    .nonempty({
      message: "Please select one toolkit",
    }),
});

const layerStepSchema = z.object({
  layer: preprocess(
    (arg) => {
      if (Array.isArray(arg)) {
        return new Set([...arg]);
      }
      return arg;
    },
    z.set(z.enum(["ETHEREUM", "CELESTIA"]), {
      invalid_type_error: "Please choose one or more options",
      required_error: "Please choose one or more options",
    }),
  ),
});

type DetailStep = z.TypeOf<typeof detailStepSchema>;
type EnvStep = z.TypeOf<typeof envStepSchema>;
type ToolkitStep = z.TypeOf<typeof toolkitStepSchema>;
type LayerStep = z.TypeOf<typeof layerStepSchema>;

type AllValues = DetailStep & EnvStep & ToolkitStep & LayerStep;

export function RegisterForm({}: RegisterFormProps) {
  const [currentStep, setCurrentStep] = React.useState<Step>(STEPS[0]);
  const [valuesInputed, setValuesInputed] = React.useState<Partial<AllValues>>(
    {},
  );

  let title = "Register your chain";
  let subTitle = "Tell us more about yourself.";

  if (currentStep === "ENVIRONMENT") {
    title = "Execution Environment";
    subTitle = "Choose one or more options";
  }
  if (currentStep === "TOOLKIT") {
    title = "Toolkit";
    subTitle = "Choose an option";
  }
  if (currentStep === "LAYER") {
    title = "Layer 1";
    subTitle = "Choose one or more options";
  }
  if (currentStep === "SUMMARY") {
    title = "Summary";
    subTitle = "Your chain summary";
  }

  const currentStepIdx = STEPS.findIndex((step) => step === currentStep);
  function jumpToStep(index: number) {
    if (index < STEPS.length && index >= 0) {
      setCurrentStep(STEPS[index]);
    }
  }

  async function formAction(_: any, formData: FormData) {
    console.log({ formData });

    if (currentStep === "DETAILS") {
      const result = detailStepSchema.safeParse(Object.fromEntries(formData));

      if (!result.success) {
        return {
          type: "error" as const,
          fieldErrors: result.error.flatten().fieldErrors,
          formData: {
            email: formData.get("email")?.toString() ?? null,
            projectName: formData.get("projectName")?.toString() ?? null,
            githubRepo: formData.get("githubRepo")?.toString() ?? null,
          },
        };
      }

      setValuesInputed({ ...valuesInputed, ...result.data });
    }
    if (currentStep === "ENVIRONMENT") {
      const result = envStepSchema.safeParse({
        env: formData.getAll("env"),
      });
      if (!result.success) {
        return {
          type: "error" as const,
          fieldErrors: result.error.flatten().fieldErrors,
          formData: {
            env: [...formData.getAll("env")].map(String),
          } as EnvStep,
        };
      }
      setValuesInputed({ ...valuesInputed, ...result.data });
    }
    if (currentStep === "TOOLKIT") {
      const result = toolkitStepSchema.safeParse(Object.fromEntries(formData));
      if (!result.success) {
        return {
          type: "error" as const,
          fieldErrors: result.error.flatten().fieldErrors,
          formData: {
            toolkit: formData.get("toolkit")?.toString() ?? null,
          },
        };
      }
      setValuesInputed({ ...valuesInputed, ...result.data });
    }
    if (currentStep === "LAYER") {
      const result = layerStepSchema.safeParse({
        layer: formData.getAll("layer"),
      });
      if (!result.success) {
        return {
          type: "error" as const,
          fieldErrors: result.error.flatten().fieldErrors,
          formData: {
            layer: new Set([...formData.getAll("layer")].map(String)),
          } as LayerStep,
        };
      }
      setValuesInputed({ ...valuesInputed, ...result.data });
    }
    jumpToStep(currentStepIdx + 1);

    return {};
  }

  const [state, action] = useFormState(formAction, {});

  const defaultValues =
    state?.type === "error" ? state.formData : valuesInputed;
  const errors = state.type === "error" ? state.fieldErrors : null;

  return (
    <form
      className="flex flex-col justify-between h-full items-center w-full"
      action={action}
    >
      <header className="p-4 border-b bg-white z-10  w-full flex flex-col items-center sticky top-0">
        <Stepper
          current={currentStepIdx}
          noOfSteps={STEPS.length - 1}
          onJumpToStep={jumpToStep}
        />
      </header>

      <div className="flex-1 flex flex-col gap-8 pt-32 py-20 justify-stretch w-full px-10 mx-auto tab:max-w-[30rem]">
        <div className="flex flex-col items-center gap-3">
          <img
            src="/images/mc-logo.svg"
            alt="Modular Cloud logo"
            className="h-6 w-6 mb-3"
          />
          <h1 className="font-medium text-2xl">{title}</h1>
          <p>{subTitle}</p>
        </div>

        <div className="flex flex-col gap-4">
          {currentStep === "DETAILS" && (
            <DetailStepForm defaultValues={defaultValues} errors={errors} />
          )}
          {currentStep === "ENVIRONMENT" && (
            <EnvStepForm defaultValues={defaultValues} errors={errors} />
          )}
          {currentStep === "TOOLKIT" && (
            <ToolkitStepForm defaultValues={defaultValues} errors={errors} />
          )}
          {currentStep === "LAYER" && (
            <LayerStepForm defaultValues={defaultValues} errors={errors} />
          )}
          {currentStep === "SUMMARY" && (
            <div className="flex flex-col gap-8">
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="font-medium text-xl leading-6">Details</h2>
                  <Button
                    type="button"
                    variant="bordered"
                    className="px-2 py-1 text-muted font-normal text-xs"
                    onClick={() => setCurrentStep("DETAILS")}
                  >
                    Edit
                  </Button>
                </div>
                <dl className="flex flex-col gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Enveloppe
                      className="h-4 w-4 flex-none"
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-0.5 flex-wrap">
                      <dt>Email:</dt>
                      <dd>
                        <strong className="font-medium">
                          {valuesInputed.email}
                        </strong>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building
                      className="h-4 w-4 flex-none"
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-0.5 flex-wrap">
                      <dt>Project Name:</dt>
                      <dd>
                        <strong className="font-medium">
                          {valuesInputed.projectName}
                        </strong>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GithubLogo
                      className="h-4 w-4 flex-none"
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-0.5 flex-wrap">
                      <dt>GitHub Repo:</dt>
                      <dd>
                        {valuesInputed.githubRepo ? (
                          <a
                            href={valuesInputed.githubRepo}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary underline"
                          >
                            {valuesInputed.githubRepo}
                          </a>
                        ) : (
                          <small className="text-muted/70 italic">
                            &lt;empty&gt;
                          </small>
                        )}
                      </dd>
                    </div>
                  </div>
                </dl>
              </section>

              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="font-medium text-xl leading-6">
                    Execution Environment
                  </h2>
                  <Button
                    type="button"
                    variant="bordered"
                    className="px-2 py-1 text-muted font-normal text-xs"
                    onClick={() => setCurrentStep("ENVIRONMENT")}
                  >
                    Edit
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ImageCheckbox
                    label="Ethereum"
                    image="/images/ethereum.png"
                    disabled
                  />
                  <ImageCheckbox
                    label="Celestia"
                    image="/images/celestia-logo.svg"
                    disabled
                  />
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="font-medium text-xl leading-6">Toolkit</h2>
                  <Button
                    type="button"
                    variant="bordered"
                    className="px-2 py-1 text-muted font-normal text-xs"
                    onClick={() => setCurrentStep("TOOLKIT")}
                  >
                    Edit
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ImageCheckbox
                    label="Ethereum"
                    image="/images/ethereum.png"
                    disabled
                  />
                  <ImageCheckbox
                    label="Celestia"
                    image="/images/celestia-logo.svg"
                    disabled
                  />
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="font-medium text-xl leading-6">Layer 1</h2>
                  <Button
                    type="button"
                    variant="bordered"
                    className="px-2 py-1 text-muted font-normal text-xs"
                    onClick={() => setCurrentStep("LAYER")}
                  >
                    Edit
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ImageCheckbox
                    label="Ethereum"
                    image="/images/ethereum.png"
                    disabled
                  />
                  <ImageCheckbox
                    label="Celestia"
                    image="/images/celestia-logo.svg"
                    disabled
                  />
                </div>
              </section>
            </div>
          )}
        </div>
      </div>

      <footer className="p-4 border-t bg-white z-10 w-full sticky bottom-0">
        <div className="flex items-center justify-stretch gap-4 md:justify-between">
          <Button
            type="button"
            variant="bordered"
            aria-disabled={currentStep === "DETAILS"}
            className="px-3 py-1 w-full md:w-auto text-center items-center justify-between md:gap-12"
            onClick={() => {
              jumpToStep(currentStepIdx - 1);
            }}
          >
            <ArrowRight
              className="h-3 w-3 text-muted -scale-x-100"
              aria-hidden="true"
            />
            <span>Previous</span>
            <span></span>
          </Button>

          <Button
            type="submit"
            className="bg-primary px-3 py-1 text-white w-full md:w-auto text-center items-center justify-between md:gap-12 hover:bg-primary/80"
          >
            <span></span>
            <span>Next</span>
            <ArrowRight className="h-3 w-3 text-white" aria-hidden="true" />
          </Button>
        </div>
      </footer>
    </form>
  );
}

type FormDefaultValues = Partial<{
  [K in keyof AllValues]?: AllValues[K] | null;
}>;
type FormStepProps = {
  defaultValues: FormDefaultValues;
  errors: Record<string, string[] | undefined> | null;
};

function DetailStepForm({ defaultValues, errors }: FormStepProps) {
  return (
    <>
      <Input
        size="small"
        label="Email"
        type="email"
        placeholder="Ex: contact@celestia.org"
        name="email"
        required
        defaultValue={defaultValues?.email}
        renderLeadingIcon={(cls) => (
          <Enveloppe className={cls} aria-hidden="true" />
        )}
        error={errors?.email}
      />
      <Input
        size="small"
        label="Project Name"
        type="text"
        placeholder="Ex: Celestia"
        name="projectName"
        defaultValue={defaultValues?.projectName}
        required
        renderLeadingIcon={(cls) => (
          <Building className={cls} aria-hidden="true" />
        )}
        error={errors?.projectName}
      />
      <Input
        size="small"
        label="Github Repo (optional)"
        type="url"
        name="githubRepo"
        defaultValue={defaultValues?.githubRepo}
        placeholder="Ex: https://github.com/celestiaorg/celestia-app"
        renderLeadingIcon={(cls) => (
          <GithubLogo className={cls} aria-hidden="true" />
        )}
        error={errors?.githubRepo}
      />
    </>
  );
}

const DEFAULT_ENVS = ["EVM", "SVM", "COSMOS", "MOVE"];

function EnvStepForm({ defaultValues, errors }: FormStepProps) {
  const [additionalEnvs, setAdditionalEnvs] = React.useState(
    defaultValues.env?.filter((env) => !DEFAULT_ENVS.includes(env)) ?? [],
  );
  return (
    <>
      {errors?.env && (
        <div
          className={cn(
            "flex flex-wrap gap-1 text-sm p-1 text-red-400 text-center items-center justify-center",
            "bg-red-100 rounded-md border-red-500 border",
          )}
        >
          <Warning className="h-4 w-4 flex-none" aria-hidden="true" />
          {errors.env.map((err, index) => (
            <span key={index}>{err}</span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <ImageCheckbox
          label="Ethereum"
          name="env"
          value="EVM"
          defaultChecked={defaultValues.env?.includes("EVM")}
          image="/images/ethereum.png"
        />
        <ImageCheckbox
          label="Sealevel"
          name="env"
          value="SVM"
          defaultChecked={defaultValues.env?.includes("SVM")}
          image="/images/sealevel.png"
        />
        <ImageCheckbox
          label="Move"
          name="env"
          value="MOVE"
          defaultChecked={defaultValues.env?.includes("MOVE")}
          image="/images/move.svg"
        />
        <ImageCheckbox
          label="Cosmos SDK"
          name="env"
          value="COSMOS"
          defaultChecked={defaultValues.env?.includes("COSMOS")}
          image="/images/cosmos.svg"
        />

        {additionalEnvs.map((currentEnv) => (
          <ImageCheckbox
            key={currentEnv}
            label={currentEnv}
            name="env"
            value={currentEnv}
            checked
            onChange={() =>
              setAdditionalEnvs(
                additionalEnvs.filter((env) => env !== currentEnv),
              )
            }
          />
        ))}
      </div>

      <Input
        size="small"
        label="Not listed here ?"
        placeholder="Enter the name here..."
        onKeyDown={(e) => {
          const currentValue = e.currentTarget.value.trim();
          if (e.key === "Enter" && currentValue) {
            e.preventDefault();
            setAdditionalEnvs([...additionalEnvs, currentValue]);
          }
        }}
      />
    </>
  );
}

const DEFAULT_TOOLKITS = [
  "BLOBSTREAM",
  "ROLLKIT",
  "DYMINT",
  "OP_STACK",
  "ARBITRUM_NITRO",
];

function ToolkitStepForm({ defaultValues, errors }: FormStepProps) {
  const [additionalToolkit, setAdditionalToolkit] = React.useState(() => {
    if (
      defaultValues.toolkit &&
      !DEFAULT_TOOLKITS.includes(defaultValues.toolkit)
    ) {
      return defaultValues.toolkit;
    }
    return null;
  });
  return (
    <>
      {errors?.toolkit && (
        <div
          className={cn(
            "flex flex-wrap gap-1 text-sm p-1 text-red-400 text-center items-center justify-center",
            "bg-red-100 rounded-md border-red-500 border",
          )}
        >
          <Warning className="h-4 w-4 flex-none" aria-hidden="true" />
          {errors.toolkit.map((err, index) => (
            <span key={index}>{err}</span>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <ImageCheckbox
          label="Blobstream"
          name="toolkit"
          value="BLOBSTREAM"
          defaultChecked={defaultValues.toolkit === "BLOBSTREAM"}
          type="radio"
          image="/images/celestia-logo.svg"
        />
        <ImageCheckbox
          label="Rollkit"
          name="toolkit"
          value="ROLLKIT"
          defaultChecked={defaultValues.toolkit === "ROLLKIT"}
          type="radio"
          image="/images/Rollkit.svg"
        />
        <ImageCheckbox
          label="Dymint"
          name="toolkit"
          value="DYMINT"
          defaultChecked={defaultValues.toolkit === "DYMINT"}
          type="radio"
          image="/images/Dymint.svg"
        />
      </div>
      <p>Other</p>
      <div className="grid grid-cols-2 gap-3">
        <ImageCheckbox
          label="OP Stack"
          name="toolkit"
          value="OP_STACK"
          defaultChecked={defaultValues.toolkit === "OP_STACK"}
          type="radio"
        />
        <ImageCheckbox
          label="Arbitrum Nitro"
          name="toolkit"
          value="ARBITRUM_NITRO"
          defaultChecked={defaultValues.toolkit === "ARBITRUM_NITRO"}
          type="radio"
        />
        {additionalToolkit && (
          <ImageCheckbox
            label={additionalToolkit}
            name="toolkit"
            type="radio"
            value={additionalToolkit}
            defaultChecked
          />
        )}
      </div>

      <Input
        size="small"
        label="Not listed here ?"
        placeholder="Enter the name here..."
        onKeyDown={(e) => {
          const currentValue = e.currentTarget.value.trim();
          if (e.key === "Enter" && currentValue) {
            e.preventDefault();
            setAdditionalToolkit(currentValue);
          }
        }}
      />
    </>
  );
}

function LayerStepForm({ defaultValues, errors }: FormStepProps) {
  return (
    <>
      {errors?.layer && (
        <div
          className={cn(
            "flex flex-wrap gap-1 text-sm p-1 text-red-400 text-center items-center justify-center",
            "bg-red-100 rounded-md border-red-500 border",
          )}
        >
          <Warning className="h-4 w-4 flex-none" aria-hidden="true" />
          {errors.layer.map((err, index) => (
            <span key={index}>{err}</span>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <ImageCheckbox
          label="Ethereum"
          name="layer"
          value="ETHEREUM"
          defaultChecked={defaultValues.layer?.has("ETHEREUM")}
          image="/images/ethereum.png"
        />
        <ImageCheckbox
          label="Celestia"
          name="layer"
          value="CELESTIA"
          defaultChecked={defaultValues.layer?.has("CELESTIA")}
          image="/images/celestia-logo.svg"
        />
      </div>
    </>
  );
}
