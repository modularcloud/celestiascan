import type { PaginationContext } from "@modularcloud/headless";
import type { HeadlessRoute } from "./headless-utils";

/**
 * List of cache keys used throughout the app
 */
export const CACHE_KEYS = {
  networks: {
    all: () => ["INTEGRATION"],
    summary: (nexToken: string | null = null) => [
      ...CACHE_KEYS.networks.all(),
      "INTEGRATION_SUMMARY",
      "INTEGRATION_SUMMARY_NEXT_TOKEN",
      nexToken?.slice(0, 20) ?? "null",
    ],
    single: (slug: string) => [
      ...CACHE_KEYS.networks.all(),
      "INTEGRATION_SINGLE",
      slug,
    ],
    platform: (platform: string) => [
      ...CACHE_KEYS.networks.all(),
      "platform",
      platform,
    ],
    status: (slug: string) => [
      ...CACHE_KEYS.networks.single(slug),
      "INTEGRATION_STATUS",
    ],
  },
  widgets: {
    evmWithPrice: (networkSlug: string) => ["EVM_WITH_PRICE", networkSlug],
    data: (networkSlug: string) => ["WIDGET_DATA", networkSlug],
  },
  search: {
    query: (network: string, query: string) => ["SEARCH_QUERY", network, query],
  },
  resolvers: {
    route: (route: HeadlessRoute, context?: PaginationContext) => [
      "RESOLVE_ROUTE",
      route.network,
      ...route.path,
      "AFTER",
      context?.after?.slice(0, 25) ?? "undefined",
      "LIMIT",
      context?.limit?.toString() ?? "-1",
      "ORDER_BY",
      context?.orderBy?.toString() ?? "undefined",
      "START_TIME",
      context?.startTime?.toString() ?? "undefined",
      "END_TIME",
      context?.endTime?.toString() ?? "undefined",
    ],
  },
  ibcFlow: (txHash: string, msgIndex: number) => ["IBC_FLOW", txHash, msgIndex],
  ibcCardFlow: (slug: string, txHash: string, msgIndex: number) => [
    "IBC_FLOW",
    slug,
    txHash,
    msgIndex,
  ],
  ibcResolve: (
    resolverId: string,
    input: {
      hash: string;
      step: number;
      slug: string;
    },
  ) => ["IBC_RESOLVE", resolverId, input] as const,
  blob: (url: string) => ["BLOB", url],
} as const;
