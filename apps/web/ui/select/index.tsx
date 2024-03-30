"use client";
import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { ArrowDown, Checkmark } from "~/ui/icons";
import { cn } from "../shadcn/utils";

export type SelectProps = {
  name?: string;
  value?: string;
  onChange?: (newValue: string) => void;
  label?: string;
  placeholder?: string;
  error?: string | string[];
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
};

export const Select = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  SelectProps
>(function Select(
  {
    name,
    value,
    onChange,
    label,
    placeholder,
    error,
    disabled,
    defaultValue,
    className,
    children,
    size = "medium",
  },
  ref,
) {
  return (
    <RadixSelect.Root
      name={name}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
      disabled={disabled}
    >
      <RadixSelect.Trigger
        className={cn(
          "flex w-full flex-col gap-1 items-start group focus:outline-none",
          className,
        )}
        aria-label={label}
        ref={ref}
      >
        <p>{label}</p>
        <div
          className={cn(
            "flex justify-between w-full",
            "flex w-full items-center gap-2 rounded-lg border px-3",
            "bg-white shadow-sm group-focus:border",
            "transition duration-150",
            "group-data-[placeholder]:text-muted",
            {
              "ring-primary/20 group-focus:border-primary group-focus:ring-2":
                !error,
              "ring-red-500/20 group-focus:border-red-500 group-focus:ring-2":
                !!error,
              "py-2 px-2": size === "medium",
              "py-1 text-sm": size === "small",
              "py-3": size === "large",
              "cursor-not-allowed bg-disabled": disabled,
            },
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <ArrowDown className="h-7 w-7 flex-none text-foreground" />
          </RadixSelect.Icon>
        </div>
      </RadixSelect.Trigger>

      {children}
    </RadixSelect.Root>
  );
});

export type SelectContentProps = Omit<
  RadixSelect.SelectContentProps,
  "position"
> & {
  children: React.ReactNode;
};

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  SelectContentProps
>(function SelectContent({ className, children, ...props }, ref) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        {...props}
        position="popper"
        sideOffset={8}
        className={cn(
          "z-40 rounded-lg w-full",
          "border border-mid-dark-100 bg-white text-foreground shadow-md",
          "[width:var(--radix-select-trigger-width)]",
          "relative data-[side=top]:-bottom-7",
          className,
        )}
        ref={ref}
      >
        <RadixSelect.Viewport className="py-1.5 w-full">
          {children}
        </RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
});

export function SelectSeparator() {
  return <RadixSelect.Separator className="h-[1px] bg-mid-dark-100 my-1.5" />;
}

export type SelectItemProps = RadixSelect.SelectItemProps;

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  SelectItemProps
>(function SelectItem(props, ref) {
  return (
    <RadixSelect.Item
      className={cn(
        "flex gap-4 items-center select-none text-muted border border-transparent justify-between",
        "rounded-md px-2 py-1.5 text-sm mx-1.5",
        "data-[highlighted]:outline-none data-[highlighted]:bg-muted/10 data-[highlighted]:text-foreground",
        "data-[highlighted]:border-mid-dark-100",
        "data-[disabled]:text-muted data-[disabled]:pointer-events-none",
        props.className,
      )}
      {...props}
      ref={ref}
    >
      <RadixSelect.ItemText>{props.children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="inline-flex items-center justify-center">
        <Checkmark className="h-4 w-4 text-foreground" />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});
