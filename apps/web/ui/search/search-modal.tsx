"use client";
import * as React from "react";
// components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/ui/shadcn/components/ui/dialog";
import { Input } from "~/ui/input";
import { ArrowRight, Search, Warning } from "~/ui/icons";
import { LoadingIndicator } from "~/ui/loading-indicator";
import { IntegrationActionListView } from "./integration-action-list-view";
import { useSearcheableEntities } from "./use-searcheable-entities";
import { IntegrationGridView } from "./integration-grid-view";
import { GlobalHotkeyContext } from "~/ui/global-hotkey-provider";

// utils
import { capitalize } from "~/lib/shared-utils";
import { cn } from "~/ui/shadcn/utils";
import Image from "next/image";

// types
import type {
  GroupedNetworkChains,
  NetworkChain,
} from "~/lib/grouped-network-chains";
import { useNetworkStatus } from "./use-network-status";
import { ALWAYS_ONLINE_NETWORKS } from "~/lib/constants";
interface Props {
  defaultNetwork: {
    value: NetworkChain;
    selected?: boolean;
  };
  children?: React.ReactNode;
  brandColor: string;
  optionGroups: GroupedNetworkChains;
  position?: "top" | "middle";
}

export function SearchModal({
  defaultNetwork,
  children,
  brandColor,
  optionGroups,
  position = "middle",
}: Props) {
  const {
    isSearchModalOpen: isDialogOpen,
    setSearchModalOpen: setIsDialogOpen,
    searchValue: inputValue,
    setSearchValue: setInputValue,
  } = React.use(GlobalHotkeyContext);
  const deferredInputValue = React.useDeferredValue(inputValue);

  const inputRef = React.useRef<React.ElementRef<"input">>(null);
  const [selectedNetwork, setSelectedNetwork] =
    React.useState<NetworkChain | null>(
      defaultNetwork.selected ? defaultNetwork.value : null,
    );

  const onSelectOption = React.useCallback(
    (option: NetworkChain) => {
      setSelectedNetwork(option);
      inputRef.current?.focus();
      setInputValue("");
    },
    [setInputValue],
  );

  const filteredOptionGroup = filterAndSortNetworkChains(
    optionGroups,
    deferredInputValue,
    defaultNetwork.value,
  );

  const isNetworkQuery =
    !selectedNetwork && Object.keys(filteredOptionGroup).length > 0;

  let currentNetwork = selectedNetwork;
  if (!selectedNetwork && !isNetworkQuery) {
    currentNetwork = defaultNetwork.value;
  }

  const { data, isLoading } = useSearcheableEntities({
    network: defaultNetwork.value.slug,
    query: inputValue,
    enabled: inputValue.length > 0,
  });

  const searcheableTypes = React.useMemo(() => data ?? [], [data]);
  const dialogRef = React.useRef<React.ElementRef<"div">>(null);

  const ecosystemChains = filterChainsByEcosystem(
    optionGroups,
    currentNetwork ? [currentNetwork.slug, ...currentNetwork.ecosystems] : [],
    deferredInputValue,
  );

  // Memoized callbacks for `IntegrationActionListView` since it is Memoized
  const onListItemActionNavigate = React.useCallback(() => {
    setSelectedNetwork(null);
    setInputValue("");
    setIsDialogOpen(false);
  }, [setIsDialogOpen, setInputValue]);

  const onListItemActionChangeChainClicked = React.useCallback(() => {
    setSelectedNetwork(null);
    setInputValue("");
  }, [setInputValue]);

  const onListItemActionSelectEcosystemChain = React.useCallback(
    onSelectOption,
    [onSelectOption],
  );

  let currentNetworkToCheck: string | null = null;
  if (
    currentNetwork &&
    !ALWAYS_ONLINE_NETWORKS.includes(currentNetwork.brandName)
  ) {
    currentNetworkToCheck = currentNetwork.slug;
  }

  const { data: networkStatus } = useNetworkStatus(currentNetworkToCheck);
  const currentNetworkHealthStatus = currentNetwork
    ? networkStatus?.[currentNetwork.slug]?.healthy ?? null
    : null;

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSelectedNetwork(
            defaultNetwork.selected ? defaultNetwork.value : null,
          );
          setInputValue("");
        }
        setIsDialogOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        ref={dialogRef}
        onCloseAutoFocus={(e) => e.preventDefault()}
        style={{
          "--color-primary": brandColor,
        }}
        className={cn(
          "max-w-[900px] max-h-[545px] md:h-full h-[calc(100%-20rem)] min-h-0 text-sm",
          {
            "top-[20rem]": position === "top",
          },
        )}
      >
        <div className="flex flex-col h-full max-h-full overflow-y-auto break-words">
          <DialogHeader className="inline-flex flex-col gap-1 h-min">
            <div className="flex">
              <Input
                size="medium"
                id="query"
                label="query"
                hideLabel
                ref={inputRef}
                placeholder={
                  selectedNetwork
                    ? "Search"
                    : `Search ${defaultNetwork.value.displayName} or Switch Chain`
                }
                autoComplete="off"
                value={inputValue}
                className="focus-within:ring-0"
                onChange={(e) => setInputValue(e.target.value)}
                helpText="Search blocks, transactions, addresses, or namespaces"
                renderTrailingIcon={(cls) =>
                  currentNetwork &&
                  currentNetworkHealthStatus !== null &&
                  currentNetworkHealthStatus === false && (
                    <div className="h-full hidden tab:flex items-center text-sm gap-2 rounded-md border px-2 py-1 bg-amber-100 border-amber-200">
                      <Warning className="text-yellow-500 flex-none h-4 w-4" />
                      <span className="whitespace-nowrap text-yellow-900">
                        Network Unavailable
                      </span>
                    </div>
                  )
                }
                renderLeadingIcon={(cls) =>
                  currentNetwork ? (
                    <div className="flex items-center gap-2 p-1">
                      {isLoading ? (
                        <LoadingIndicator className="h-4 w-4 text-primary" />
                      ) : (
                        <Image
                          src={currentNetwork.logoURL}
                          width={16}
                          height={16}
                          alt={`${currentNetwork.displayName} logo`}
                          className="h-4 w-4 inline-block rounded-full"
                        />
                      )}

                      <span className="whitespace-nowrap">
                        {capitalize(currentNetwork.brandName)}
                        &nbsp;/&nbsp;
                        {capitalize(currentNetwork.displayName)}
                      </span>

                      <div className="h-4 w-4 flex items-center justify-center flex-none">
                        <ArrowRight
                          className="text-muted h-3 w-3 flex-none"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ) : (
                    <Search className={cn(cls)} />
                  )
                }
              />
            </div>
            {currentNetwork &&
              currentNetworkHealthStatus !== null &&
              currentNetworkHealthStatus === false && (
                <div className="h-full flex tab:hidden items-center justify-center text-sm gap-2 rounded-md border px-2 py-1 bg-amber-100 border-amber-200">
                  <Warning className="text-yellow-500 flex-none h-5 w-5" />
                  <span className="whitespace-nowrap text-yellow-900">
                    Network Unavailable
                  </span>
                </div>
              )}
          </DialogHeader>

          {!currentNetwork && isNetworkQuery && (
            <IntegrationGridView
              parentDialogRef={dialogRef}
              optionGroups={filteredOptionGroup}
              defaultChainBrand={defaultNetwork.value.brandName}
              onSelectOption={onSelectOption}
            />
          )}

          {currentNetwork && !isNetworkQuery && (
            <IntegrationActionListView
              query={deferredInputValue}
              parentDialogRef={dialogRef}
              searcheableTypes={searcheableTypes}
              selectedNetwork={currentNetwork}
              onChangeChainClicked={onListItemActionChangeChainClicked}
              onNavigate={onListItemActionNavigate}
              onSelectEcosystemChain={onListItemActionSelectEcosystemChain}
              ecosystemNetworks={ecosystemChains}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function filterAndSortNetworkChains(
  networkGrouped: GroupedNetworkChains,
  filter: string,
  networkToPrioritize?: NetworkChain,
) {
  const filteredChains: GroupedNetworkChains = [];

  for (const networks of networkGrouped) {
    const filtered =
      // this is a little perf optimization, because we are sure that the filter will match all networks
      filter.trim().length === 0
        ? networks
        : networks.filter(
            (chain) =>
              chain.displayName.toLowerCase().startsWith(filter) ||
              chain.brandName.toLowerCase().startsWith(filter),
          );

    if (filtered.length > 0) {
      if (filtered[0].accountId === networkToPrioritize?.accountId) {
        filteredChains.unshift(filtered);
      } else {
        filteredChains.push(filtered);
      }
    }
  }

  return filteredChains;
}

function filterChainsByEcosystem(
  optionGroups: GroupedNetworkChains,
  ecosystems: string[],
  filter: string,
) {
  const chains =
    ecosystems.length === 0
      ? []
      : optionGroups.filter((group) =>
          group.every((chain) =>
            ecosystems.some((ecosystem) =>
              chain.ecosystems.includes(ecosystem),
            ),
          ),
        );

  return filterAndSortNetworkChains(chains, filter);
}
