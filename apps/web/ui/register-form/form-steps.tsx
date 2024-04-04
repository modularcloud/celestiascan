/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { Building } from "lucide-react";
import { RegisterFormValues } from "~/app/(register)/register/register-schema";
import { Button } from "~/ui/button";
import {
  CalendarTime,
  Enveloppe,
  GithubLogo,
  Home2,
  Live,
  Plus,
  Warning,
} from "~/ui/icons";
import { Input } from "~/ui/input";
import { cn } from "~/ui/shadcn/utils";
import { ImageCheckbox } from "./image-checkbox";
import { RegisterFormStep } from ".";
import { Checkbox } from "~/ui/checkbox";
import { Select, SelectContent, SelectItem } from "~/ui/select";

type FormDefaultValues = Partial<{
  [K in keyof RegisterFormValues]?: RegisterFormValues[K] | null;
}>;
type FormStepProps = {
  defaultValues: FormDefaultValues;
  errors: Record<string, string[] | undefined> | null;
};

const DEFAULT_ENVS = [
  { value: "ETHEREUM", name: "Ethereum", logo: "/images/ethereum.png" },
  { value: "SEALEVEL", name: "Sealevel", logo: "/images/sealevel.png" },
  { value: "COSMOS_SDK", name: "Cosmos SDK", logo: "/images/cosmos.svg" },
  { value: "MOVE", name: "Move", logo: "/images/move.svg" },
];

const DEFAULT_TOOLKITS = [
  {
    value: "BLOBSTREAM",
    name: "Blobstream",
    logo: "/images/celestia-logo.svg",
  },
  {
    value: "ROLLKIT",
    name: "Rollkit",
    logo: "/images/rollkit-logo.svg",
  },
];

const DEFAULT_LAYERS = [
  {
    value: "ETHEREUM",
    name: "Ethereum",
    logo: "/images/ethereum.png",
  },
  {
    value: "CELESTIA",
    name: "Celestia",
    logo: "/images/celestia-logo.svg",
  },
];

export function DetailStepForm({ defaultValues, errors }: FormStepProps) {
  const [isProjectLive, setIsProjectLive] = React.useState(
    Boolean(defaultValues.isProjectLive ?? true),
  );
  return (
    <>
      <Input
        size="small"
        label="Email"
        type="email"
        placeholder="Ex: contact@modular.cloud"
        name="email"
        required
        defaultValue={defaultValues?.email}
        autoFocus
        renderLeadingIcon={(cls) => (
          <Enveloppe className={cls} aria-hidden="true" />
        )}
        error={errors?.email}
      />
      <Input
        size="small"
        label="Project Name"
        type="text"
        placeholder="Ex: Modular Cloud"
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
        placeholder="Ex: https://github.com/modularcloud/explorer"
        renderLeadingIcon={(cls) => (
          <GithubLogo className={cls} aria-hidden="true" />
        )}
        error={errors?.githubRepo}
      />

      <Checkbox
        checked={isProjectLive}
        name="isProjectLive"
        value="true"
        label="This project is currently live"
        onChange={(e) => setIsProjectLive(e.target.checked)}
      />

      {!isProjectLive && (
        <Select
          size="small"
          label="Estimated Launch Date (optional)"
          placeholder="Choose a value"
          name="estimatedLaunchDate"
          defaultValue={defaultValues.estimatedLaunchDate ?? undefined}
        >
          <SelectContent>
            <SelectItem value="Q1 2024">Q1 2024</SelectItem>
            <SelectItem value="Q2 2024">Q2 2024</SelectItem>
            <SelectItem value="Q3 2024">Q3 2024</SelectItem>
            <SelectItem value="Q4 2024 or later">Q4 2024 or later</SelectItem>
          </SelectContent>
        </Select>
      )}
    </>
  );
}

export function EnvStepForm({ defaultValues, errors }: FormStepProps) {
  const [additionalEnvs, setAdditionalEnvs] = React.useState(() => {
    const defaultEnvValues = DEFAULT_ENVS.map((e) => e.value);
    return (
      defaultValues.env?.filter((env) => !defaultEnvValues.includes(env)) ?? []
    );
  });

  const inputRef = React.useRef<React.ElementRef<"input">>(null);

  function addAdditionalEnv() {
    const currentValue = inputRef.current?.value.trim();
    if (inputRef.current && currentValue) {
      setAdditionalEnvs([...additionalEnvs, currentValue]);
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

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
        {DEFAULT_ENVS.map((env) => (
          <ImageCheckbox
            key={env.value}
            label={env.name}
            name="env"
            value={env.value}
            defaultChecked={defaultValues.env?.includes(env.value)}
            image={env.logo}
          />
        ))}

        {additionalEnvs.map((currentEnv, index) => (
          <ImageCheckbox
            key={index}
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

      <div className="flex flex-col gap-4 items-end sm:flex-row">
        <Input
          size="small"
          ref={inputRef}
          label="Not listed here ?"
          placeholder="Enter the name here..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addAdditionalEnv();
            }
          }}
        />
        <Button
          color="transparent"
          variant="bordered"
          className="min-w-max px-3 py-1 inline-flex justify-between w-full sm:w-auto"
          type="button"
          onClick={addAdditionalEnv}
        >
          <span></span>
          <span>Add</span>
          <Plus className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
        </Button>
      </div>
    </>
  );
}

export function ToolkitStepForm({ defaultValues, errors }: FormStepProps) {
  const [additionalToolkit, setAdditionalToolkit] = React.useState(() => {
    if (
      defaultValues.toolkit &&
      !DEFAULT_TOOLKITS.find(
        (toolkit) => defaultValues.toolkit === toolkit.value,
      )
    ) {
      return defaultValues.toolkit;
    }
    return null;
  });

  const inputRef = React.useRef<React.ElementRef<"input">>(null);

  function addToolkit() {
    const currentValue = inputRef.current?.value.trim();
    if (inputRef.current && currentValue) {
      setAdditionalToolkit(currentValue);
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

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
        {DEFAULT_TOOLKITS.map((toolkit) => (
          <ImageCheckbox
            key={toolkit.value}
            label={toolkit.name}
            name="toolkit"
            value={toolkit.value}
            defaultChecked={defaultValues.toolkit === toolkit.value}
            type="radio"
            image={toolkit.logo}
          />
        ))}

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

      <div className="flex flex-col gap-4 items-end sm:flex-row">
        <Input
          size="small"
          ref={inputRef}
          label="Not listed here ?"
          placeholder="Enter the name here..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addToolkit();
            }
          }}
        />
        <Button
          color="transparent"
          variant="bordered"
          className="min-w-max px-3 py-1 inline-flex justify-between w-full sm:w-auto"
          type="button"
          onClick={addToolkit}
        >
          <span></span>
          <span>Add</span>
          <Plus className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
        </Button>
      </div>
    </>
  );
}

export function LayerStepForm({ defaultValues, errors }: FormStepProps) {
  const [additionalLayers, setAdditionalLayers] = React.useState(() => {
    const defaultLayerValues = DEFAULT_LAYERS.map((e) => e.value);
    return (
      defaultValues.layer?.filter(
        (layer) => !defaultLayerValues.includes(layer),
      ) ?? []
    );
  });

  const inputRef = React.useRef<React.ElementRef<"input">>(null);

  function addAdditionalLayer() {
    const currentValue = inputRef.current?.value.trim();
    if (inputRef.current && currentValue) {
      setAdditionalLayers([...additionalLayers, currentValue]);
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

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
        {DEFAULT_LAYERS.map((layer) => (
          <ImageCheckbox
            key={layer.value}
            label={layer.name}
            name="layer"
            value={layer.value}
            defaultChecked={defaultValues.layer?.includes(layer.value)}
            image={layer.logo}
          />
        ))}

        {additionalLayers.map((currentLayer, index) => (
          <ImageCheckbox
            key={index}
            label={currentLayer}
            name="layer"
            value={currentLayer}
            checked
            onChange={() =>
              setAdditionalLayers(
                additionalLayers.filter((layer) => layer !== currentLayer),
              )
            }
          />
        ))}
      </div>

      <div className="flex flex-col gap-4 items-end sm:flex-row">
        <Input
          size="small"
          ref={inputRef}
          label="Not listed here ?"
          placeholder="Enter the name here..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addAdditionalLayer();
            }
          }}
        />
        <Button
          color="transparent"
          variant="bordered"
          className="min-w-max px-3 py-1 inline-flex justify-between w-full sm:w-auto"
          type="button"
          onClick={addAdditionalLayer}
        >
          <span></span>
          <span>Add</span>
          <Plus className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
        </Button>
      </div>
    </>
  );
}

export function SummaryStep({
  values,
  onJumpToStep,
}: {
  values: RegisterFormValues;
  onJumpToStep: (step: RegisterFormStep) => void;
}) {
  const toolkitFound = DEFAULT_TOOLKITS.find(
    (toolkit) => toolkit.value === values.toolkit,
  );
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h2 className="font-medium text-xl leading-6">Details</h2>
          <Button
            type="button"
            variant="bordered"
            className="px-2 py-1 text-muted font-normal text-xs"
            onClick={() => onJumpToStep("DETAILS")}
          >
            Edit
          </Button>
        </div>
        <dl className="flex flex-col gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Enveloppe className="h-4 w-4 flex-none" aria-hidden="true" />
            <div className="flex items-center gap-0.5 flex-wrap">
              <dt>Email:</dt>
              <dd>
                <strong className="font-medium">{values.email}</strong>
              </dd>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Building className="h-4 w-4 flex-none" aria-hidden="true" />
            <div className="flex items-center gap-0.5 flex-wrap">
              <dt>Project Name:</dt>
              <dd>
                <strong className="font-medium">{values.projectName}</strong>
              </dd>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Live className="h-4 w-4 flex-none" aria-hidden="true" />
            <div className="flex items-center gap-0.5 flex-wrap">
              <dt>The project is live ?</dt>
              <dd>
                <strong className="font-medium">
                  {values.isProjectLive ? "Yes" : "No"}
                </strong>
              </dd>
            </div>
          </div>

          {values.estimatedLaunchDate && (
            <div className="flex items-center gap-1.5">
              <CalendarTime className="h-4 w-4 flex-none" aria-hidden="true" />
              <div className="flex items-center gap-0.5 flex-wrap">
                <dt>Estimated Launch date:</dt>
                <dd>
                  <strong className="font-medium">
                    {values.estimatedLaunchDate}
                  </strong>
                </dd>
              </div>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <GithubLogo className="h-4 w-4 flex-none" aria-hidden="true" />
            <div className="flex items-center gap-0.5 flex-wrap">
              <dt>GitHub Repo:</dt>
              <dd>
                {values.githubRepo ? (
                  <a
                    href={values.githubRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    {values.githubRepo}
                  </a>
                ) : (
                  <small className="text-muted/70 italic">&lt;empty&gt;</small>
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
            onClick={() => onJumpToStep("ENVIRONMENT")}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 place-items-stretch">
          {values.env.map((env) => {
            const envFound = DEFAULT_ENVS.find(
              (defEnv) => env === defEnv.value,
            );
            return envFound ? (
              <ImageCheckbox
                key={env}
                label={envFound.name}
                image={envFound.logo}
                disabled
                direction="horizontal"
              />
            ) : (
              <ImageCheckbox
                key={env}
                label={env}
                disabled
                direction="horizontal"
              />
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h2 className="font-medium text-xl leading-6">Toolkit</h2>
          <Button
            type="button"
            variant="bordered"
            className="px-2 py-1 text-muted font-normal text-xs"
            onClick={() => onJumpToStep("TOOLKIT")}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 place-items-stretch">
          {toolkitFound ? (
            <ImageCheckbox
              label={toolkitFound.name}
              image={toolkitFound.logo}
              disabled
              direction="horizontal"
            />
          ) : (
            <ImageCheckbox
              label={values.toolkit}
              disabled
              direction="horizontal"
            />
          )}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h2 className="font-medium text-xl leading-6">Layer 1</h2>
          <Button
            type="button"
            variant="bordered"
            className="px-2 py-1 text-muted font-normal text-xs"
            onClick={() => onJumpToStep("LAYER")}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 place-items-stretch">
          {values.layer.map((layer) => {
            const layerFound = DEFAULT_LAYERS.find(
              (defLayer) => layer === defLayer.value,
            );
            return layerFound ? (
              <ImageCheckbox
                key={layer}
                label={layerFound.name}
                image={layerFound.logo}
                disabled
                direction="horizontal"
              />
            ) : (
              <ImageCheckbox
                key={layer}
                label={layer}
                disabled
                direction="horizontal"
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export function SuccessStep({ onReset }: { onReset: () => void }) {
  return (
    <div className="h-full w-full fixed inset-0">
      <div
        className={cn(
          "absolute flex flex-col gap-4",
          "animate-slide-up-from-bottom top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        )}
      >
        <div
          className={cn(
            "",
            "min-w-max border border-mid-dark-100 bg-muted-100 px-8 py-6 rounded-md ",
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
                Thank you for registering your chain
              </p>
              <p className="relative z-10">We will reach out to you soon.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            color="primary"
            onClick={onReset}
            className="flex-1 inline-flex justify-center text-xs md:text-base"
          >
            Register another chain
          </Button>
          <Button
            color="transparent"
            href="/"
            variant="bordered"
            className="flex-1 inline-flex justify-center gap-1 border-mid-dark-100 bg-muted-100 text-muted text-xs md:text-base"
          >
            <span>Return home</span>
            <span>
              <Home2 className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
            </span>
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
