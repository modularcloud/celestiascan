/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { useFormState } from "react-dom";
import { Button } from "~/ui/button";
import { ArrowRight, Stars } from "~/ui/icons";
import { Stepper } from "./stepper";
import { cn } from "~/ui/shadcn/utils";
import {
  detailStepSchema,
  envStepSchema,
  toolkitStepSchema,
  layerStepSchema,
  type RegisterFormValues,
  type EnvStep,
  type LayerStep,
  registerFormValuesSchema,
} from "~/app/(register)/register/register-schema";
import { sendEmail } from "~/app/(register)/register/send-email.action";
import { LoadingIndicator } from "~/ui/loading-indicator";
import {
  DetailStepForm,
  EnvStepForm,
  ToolkitStepForm,
  LayerStepForm,
  SummaryStep,
  SuccessStep,
} from "./form-steps";
import type { EventFor } from "~/lib/types";

const STEPS = [
  "DETAILS",
  "ENVIRONMENT",
  "TOOLKIT",
  "LAYER",
  "SUMMARY",
  "SUCCESS",
] as const;
export type RegisterFormStep = (typeof STEPS)[number];

export function RegisterForm() {
  const [isSendingEmail, startTransition] = React.useTransition();
  const [currentStep, setCurrentStep] = React.useState<RegisterFormStep>(
    STEPS[0],
  );
  const [valuesInputed, setValuesInputed] = React.useState<
    Partial<RegisterFormValues>
  >({});
  const [totalFilledSteps, setTotalFilledSteps] = React.useState(0);

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
      let canJumpToStep = false;
      const step = STEPS[index];
      switch (step) {
        case "DETAILS":
          canJumpToStep = true;
          break;
        case "ENVIRONMENT":
          canJumpToStep = detailStepSchema.safeParse(valuesInputed).success;
          break;
        case "TOOLKIT":
          canJumpToStep = envStepSchema.safeParse(valuesInputed).success;
          break;
        case "LAYER":
          canJumpToStep = toolkitStepSchema.safeParse(valuesInputed).success;
          break;
        case "SUMMARY":
          canJumpToStep = layerStepSchema.safeParse(valuesInputed).success;
          break;
        default:
          break;
      }
      if (canJumpToStep) {
        setCurrentStep(STEPS[index]);
      }
    }
  }
  function resetForm() {
    setCurrentStep(STEPS[0]);
    setValuesInputed({});
    setTotalFilledSteps(0);
  }

  function validateFormAndSaveState(formData: FormData, progress: boolean) {
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
      if (progress) {
        setCurrentStep("ENVIRONMENT");
        setTotalFilledSteps((total) => (total >= 1 ? total : 1));
      }
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
      if (progress) {
        setCurrentStep("TOOLKIT");
        setTotalFilledSteps((total) => (total >= 2 ? total : 2));
      }
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
      if (progress) {
        setCurrentStep("LAYER");
        setTotalFilledSteps((total) => (total >= 3 ? total : 3));
      }
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
            layer: [...formData.getAll("layer")].map(String),
          } as LayerStep,
        };
      }
      setValuesInputed({ ...valuesInputed, ...result.data });
      if (progress) {
        setCurrentStep("SUMMARY");
        setTotalFilledSteps((total) => (total >= 4 ? total : 4));
      }
    }
    if (currentStep === "SUMMARY") {
      if (progress) {
        startTransition(() =>
          sendEmail(registerFormValuesSchema.parse(valuesInputed)).then(() => {
            setCurrentStep("SUCCESS");
            setTotalFilledSteps(5);
          }),
        );
      }
    }
  }

  async function formAction(_: any, formData: FormData) {
    const errors = validateFormAndSaveState(formData, true);
    if (errors !== undefined) return errors;
    // default values
    return null;
  }

  const [state, action] = useFormState(formAction, null);

  const defaultValues = {
    ...valuesInputed,
    ...state?.formData,
  };
  const errors = state?.type === "error" ? state.fieldErrors : null;

  return (
    <form
      className="flex flex-col justify-between h-full items-center w-full"
      action={action}
    >
      <header
        className={cn(
          "p-4 border-b bg-white z-10  w-full flex flex-col items-center sticky top-0",
          {
            "pointer-events-none": currentStep === "SUCCESS",
          },
        )}
      >
        <Stepper
          totalFilledSteps={totalFilledSteps}
          current={currentStepIdx}
          noOfSteps={STEPS.length - 2}
          onJumpToStep={jumpToStep}
        />
      </header>

      <div className="flex-1 flex flex-col gap-8 pt-32 py-20 justify-stretch w-full px-10 mx-auto tab:max-w-[30rem] relative">
        {currentStep !== "SUCCESS" && (
          <div className="flex flex-col items-center gap-3">
            <img
              src="/images/mc-logo.svg"
              alt="Modular Cloud logo"
              className="h-8 w-8 mb-3"
            />
            <h1 className="font-medium text-2xl">{title}</h1>
            <p>{subTitle}</p>
          </div>
        )}

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
            <SummaryStep
              values={valuesInputed as RegisterFormValues}
              onJumpToStep={setCurrentStep}
            />
          )}
          {currentStep === "SUCCESS" && <SuccessStep onReset={resetForm} />}
        </div>
      </div>

      {currentStep !== "SUCCESS" && (
        <footer className="p-4 border-t bg-white z-10 w-full sticky bottom-0">
          <div className="flex items-center justify-stretch gap-4 md:justify-between">
            {currentStep !== "DETAILS" ? (
              <Button
                type="button"
                variant="bordered"
                className="px-3 py-1 w-full md:w-auto text-center items-center justify-between md:gap-12"
                onClick={(event: EventFor<"button", "onClick">) => {
                  validateFormAndSaveState(
                    new FormData(event.currentTarget.form!),
                    false,
                  );
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
            ) : (
              // For spacing purposes and to push the `Next` button to the  right
              <div></div>
            )}

            <Button
              type="submit"
              disabled={isSendingEmail}
              color="primary"
              className="px-3 py-1 w-full md:w-auto text-center items-center justify-between md:gap-12"
            >
              <span>
                {isSendingEmail ? (
                  <LoadingIndicator className="text-white h-4 w-4" />
                ) : (
                  currentStep === "SUMMARY" && (
                    <Stars className="h-4 w-4 text-white" aria-hidden="true" />
                  )
                )}
              </span>
              <span>{currentStep === "SUMMARY" ? "Submit" : "Next"}</span>
              <span>
                {currentStep !== "SUMMARY" && (
                  <ArrowRight
                    className="h-3 w-3 text-white"
                    aria-hidden="true"
                  />
                )}
              </span>
            </Button>
          </div>
        </footer>
      )}
    </form>
  );
}
