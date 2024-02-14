import * as React from "react";

import { cn } from "~/ui/shadcn/utils";
import { useMediaQuery } from "~/lib/hooks/use-media-query";
import { capitalize } from "~/lib/shared-utils";
import { useItemGrid } from "~/lib/hooks/use-item-grid";

import Image from "next/image";
import { useVirtualizer } from "@tanstack/react-virtual";
import type {
  GroupedNetworkChains,
  NetworkChain,
} from "~/lib/grouped-network-chains";
import { FancyCheck } from "~/ui/icons";
import { Tooltip } from "~/ui/tooltip";
import { useNetworkStatuses } from "./use-network-status";
import { useSearchOptionsContext } from "~/ui/search-options-context";

interface Props {
  className?: string;
  optionGroups: GroupedNetworkChains;
  onSelectOption?: (chain: NetworkChain) => void;
  defaultChainBrand?: string;
  parentDialogRef: React.RefObject<React.ElementRef<"div">>;
}

export const IntegrationGridView = React.memo(function IntegrationGridView({
  onSelectOption: onClickOption,
  optionGroups,
  className,
  defaultChainBrand,
  parentDialogRef,
}: Props) {
  const isOneColumn = useMediaQuery("(max-width: 594px)");
  const isTwoColumns = useMediaQuery(
    "(min-width: 595px) and (max-width: 800px)",
  );

  const noOfColumns = isOneColumn ? 1 : isTwoColumns ? 2 : 3;

  const { groupedByLines, registerOptionProps } = useItemGrid({
    noOfColumns,
    optionGroups,
    scopeRef: parentDialogRef,
    onClickOption,
    onSelectOption: ({ rowIndex, inputMethod }) => {
      if (inputMethod === "keyboard") {
        virtualizer.scrollToIndex(rowIndex);
      }
    },
    defaultOptionGroupKeyToSortFirst: defaultChainBrand,
    scrollOnSelection: false,
  });

  const parentRef = React.useRef<React.ElementRef<"div">>(null);

  const ROW_SIZE = 192; // size of one row, measured visually by inspecting the DOM in the browsers' devtools
  const virtualizer = useVirtualizer({
    count: groupedByLines.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_SIZE,
    overscan: 2,
    scrollPaddingEnd: 0,
    scrollPaddingStart: 0,
  });

  const registerItemProps = React.useCallback(registerOptionProps, [
    registerOptionProps,
  ]);

  return (
    <div
      className={cn(
        "h-full flex-1",
        "max-h-[calc(100%-60px)] overflow-y-auto",
        className,
      )}
      role="grid"
      tabIndex={0}
      ref={parentRef}
    >
      <div
        className="relative"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const rowIndex = virtualRow.index;
          const rowGroups = groupedByLines[rowIndex];

          return (
            <React.Fragment key={virtualRow.key}>
              <div
                role="row"
                aria-rowindex={rowIndex + 1}
                className="grid items-stretch absolute top-0 left-0 w-full py-2"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  gridTemplateColumns: `repeat(${noOfColumns}, minmax(0, 1fr))`,
                }}
              >
                {rowGroups.map((chains, colIndex) => (
                  <BrandChains
                    chains={chains}
                    key={chains[0].accountId}
                    colIndex={colIndex}
                    noOfColumns={noOfColumns}
                    registerItemProps={registerItemProps}
                    rowIndex={rowIndex}
                  />
                ))}

                {(rowIndex < groupedByLines.length - 1 ||
                  (groupedByLines.length === 1 && rowIndex === 0)) && (
                  <hr
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      gridColumnStart: "1",
                      gridColumn: `span ${noOfColumns} / span ${noOfColumns}`,
                    }}
                  />
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
});

type OptionProps = ReturnType<
  ReturnType<typeof useItemGrid<NetworkChain>>["registerOptionProps"]
>;

type BrandChainsProps = {
  chains: NetworkChain[];
  colIndex: number;
  rowIndex: number;
  noOfColumns: number;
  registerItemProps: (
    rowIndex: number,
    colIndex: number,
    option: NetworkChain,
  ) => OptionProps;
};

function formatEcosystemName(ecosystem: string) {
  const nameParts = ecosystem.split("-").filter(Boolean);
  return nameParts.map((str, i) => i === nameParts.length - 1 ? `(${capitalize(str)})` : capitalize(str)).join(" ");
}

const BrandChains = React.memo(function BrandChains({
  chains: options,
  rowIndex,
  colIndex,
  noOfColumns,
  registerItemProps,
}: BrandChainsProps) {
  const groupName = options[0].brandName;

  const allNetworkChains = useSearchOptionsContext();

  const ecosystemNetworks = React.useMemo(() => {
    const values = allNetworkChains.flat();
    const brandEcosystems = options[0].ecosystems ?? [];
    const foundNetworks = values.filter((network) =>
      brandEcosystems.includes(network.id),
    );
    // I AM NOT PROUD OF THIS as it is very inefficient 😑
    // the good part is that it works 🤷‍♂️
    // we map other the `brandEcosystems` instead of returning `foundNetworks`
    // because we want to keep the same order
    return brandEcosystems
      .map(
        (ecosystem) =>
          foundNetworks.find(
            (network) => network.id === ecosystem,
          ) as NetworkChain,
      )
      .filter(Boolean);
  }, [allNetworkChains, options]);

  const alwaysOnlineChainBrands = ["celestia", "eclipse"];
  const { data } = useNetworkStatuses(
    options.map((network) => network.id),
    !alwaysOnlineChainBrands.includes(options[0].brandName),
  );

  // arbitrary, but this is decent value
  const MAX_Z_INDEX = 999_999_999;
  const isPremiumChain = options[0].verified;

  return (
    <div
      role="gridcell"
      aria-colindex={colIndex + 1}
      className={cn("flex-1", {
        "border-r border-mid-dark-100": colIndex < noOfColumns - 1,
        "pr-4": colIndex === 0,
        "px-4": colIndex > 0 && colIndex < noOfColumns,
        "pl-4": colIndex === noOfColumns,
      })}
    >
      <div
        className="flex flex-col"
        role="group"
        aria-labelledby={`row-${rowIndex}-col-${colIndex}-header`}
      >
        <div
          className="flex items-center gap-2 px-3 py-1.5"
          aria-hidden="true"
          role="presentation"
          id={`row-${rowIndex}-col-${colIndex}-header`}
          style={{
            // @ts-expect-error This is a CSS variable
            "--color-primary": options[0].brandColor.replaceAll(",", ""),
          }}
        >
          <span>{capitalize(groupName)}</span>
          <span className="sr-only" aria-hidden="true" id={`${groupName}-logo`}>
            {groupName} logo
          </span>
          <Image
            src={options[0].logoURL}
            height="16"
            width="16"
            alt={``}
            aria-describedby={`${groupName}-logo`}
            className="border-none rounded-full object-center w-4 h-4 aspect-square"
          />
          {!isPremiumChain && ecosystemNetworks.length > 0 && (
            <div className="flex items-center gap-0.5 bg-muted-100 pl-1 pr-0 rounded-full">
              <ul className="flex items-center gap-0">
                {ecosystemNetworks.map((ecosystem, index) => (
                  <li
                    key={ecosystem.id}
                    className="relative rounded-full p-0.5 bg-white"
                    style={{
                      zIndex: MAX_Z_INDEX - index,
                      marginLeft: `-${index * 9}px`,
                    }}
                  >
                    <Tooltip
                      label={`${formatEcosystemName(
                        ecosystem.id,
                      )} Ecosystem`}
                    >
                      <Image
                        src={ecosystem.logoURL}
                        height="18"
                        width="18"
                        alt={`Logo ${ecosystem.displayName}`}
                        aria-describedby={`${groupName}-logo`}
                        className="border-none rounded-full bg-mid-dark-100 object-center w-[1.125rem] h-[1.125rem] aspect-square"
                      />
                    </Tooltip>
                  </li>
                ))}
              </ul>
              <FancyCheck
                className="text-gray-400 w-6 h-6 flex-none"
                aria-hidden="true"
              />
            </div>
          )}
          {isPremiumChain && (
            <Tooltip label="This chain is verified">
              <span>
                <FancyCheck
                  className="text-primary h-6 w-6 flex-none"
                  aria-hidden="true"
                />
              </span>
            </Tooltip>
          )}
        </div>

        {options.map((option) => {
          const healthStatus = data?.[option.id].healthy ?? null;
          const isAlwaysOnline = alwaysOnlineChainBrands.includes(
            option.brandName,
          );
          return (
            <div
              key={option.id}
              {...registerItemProps(rowIndex, colIndex, option)}
              className={cn(
                "pl-3 pr-1.5 py-1.5 flex justify-between items-center rounded-md",
                "group cursor-pointer",
                "aria-[selected=true]:bg-muted-100",
                "focus-visible:outline-none",
              )}
            >
              <span
                className={cn(
                  `text-muted group-aria-[selected=true]:text-foreground`,
                )}
              >
                {capitalize(option.displayName)}
              </span>
              <div
                aria-hidden="true"
                className={cn(
                  "opacity-0 transition-none bg-white",
                  "group-aria-[selected=true]:opacity-100",
                  "px-4 py-2 rounded-lg font-medium",
                )}
              >
                Select
              </div>
              <div
                className={cn(
                  "opacity-100 relative flex items-center justify-center",
                  "group-aria-[selected=true]:hidden",
                  "rounded-lg font-medium pr-1.5",
                )}
              >
                {isAlwaysOnline ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-teal-500 opacity-75"></span>
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-teal-500">
                      <span className="sr-only">Network online</span>
                    </span>
                  </>
                ) : (
                  healthStatus !== null &&
                  (healthStatus === true ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-teal-500 opacity-75"></span>
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-teal-500">
                        <span className="sr-only">Network online</span>
                      </span>
                    </>
                  ) : (
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-red-500">
                      <span className="sr-only">Network unavailable</span>
                    </span>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
