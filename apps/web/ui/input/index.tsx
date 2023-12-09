import * as React from "react";
import { cn } from "~/ui/shadcn/utils";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "defaultValue"
> & {
  inputClassName?: string;
  helpText?: string;
  renderLeadingIcon?: (classNames: string) => React.ReactNode;
  renderTrailingIcon?: (classNames: string) => React.ReactNode;
  size?: "small" | "medium" | "large";
  label: string;
  hideLabel?: boolean;
  defaultValue?: string | number | readonly string[] | undefined | null;
  error?: string | string[];
};

export const Input = React.forwardRef<React.ElementRef<"input">, InputProps>(
  function Input(
    {
      className,
      helpText,
      inputClassName,
      label,
      renderLeadingIcon,
      renderTrailingIcon,
      hideLabel = false,
      required = false,
      autoComplete = "off",
      type = "text",
      size = "medium",
      id: defaultId,
      disabled = false,
      defaultValue,
      error,
      ...otherProps
    },
    ref,
  ) {
    const id = React.useId();
    const validationId = React.useId();
    const helpId = React.useId();

    return (
      <div className={cn(className, "flex w-full flex-col gap-1")}>
        <label htmlFor={id} className={cn(hideLabel && "sr-only")}>
          {label}
        </label>
        <div
          className={cn(
            className,
            "flex w-full items-center gap-2 rounded-md border px-3",
            "bg-white shadow-sm focus-within:border",
            "transition duration-150",
            {
              "ring-primary/20 focus-within:border-primary focus-within:ring-2":
                !error,
              "ring-red-500/20 focus-within:border-red-500 focus-within:ring-2":
                !!error,
              "py-2 px-2": size === "medium",
              "py-1 text-sm": size === "small",
              "py-3": size === "large",
              "cursor-not-allowed bg-disabled": disabled,
            },
          )}
        >
          <div className="inline-grid place-items-center flex-shrink-0">
            {renderLeadingIcon?.(
              cn("text-muted flex-shrink-0 m-1.5", {
                "h-4 w-4": size !== "large",
                "h-5 w-5": size === "large",
              }),
            )}
          </div>
          <input
            {...otherProps}
            ref={ref}
            aria-describedby={helpId}
            id={defaultId ?? id}
            autoComplete={autoComplete}
            type={type}
            defaultValue={defaultValue ?? undefined}
            disabled={disabled}
            required={required}
            className={cn(
              "w-full bg-transparent focus:outline-none disabled:text-foreground/30 placeholder:text-muted",
              inputClassName,
              {
                "cursor-not-allowed": disabled,
              },
            )}
          />
          {renderTrailingIcon?.(
            cn("text-muted flex-shrink-0", {
              "h-4 w-4": size !== "large",
              "h-5 w-5": size === "large",
            }),
          )}
        </div>

        {error && (
          <small
            id={validationId}
            aria-live="assertive"
            role="alert"
            className={cn("flex gap-1 text-red-400 flex-wrap")}
          >
            {typeof error === "string"
              ? error
              : error.map((msg, index) => <span key={index}>{msg}</span>)}
          </small>
        )}
        {helpText && (
          <small id={helpId} className="text-primary">
            {helpText}
          </small>
        )}
      </div>
    );
  },
);
