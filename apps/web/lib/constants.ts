export const DEFAULT_BRAND_COLOR = "256 100% 57%"; // in HSL format, corresponding to this color : #8457FF

export const DEFAULT_WIDGET_REVALIDATE_TIME_IN_SECONDS = 1;
export const DEFAULT_WIDGET_REFETCH_TIME_IN_SECONDS = 5;

export const DYMENSION_ROLLAPP_IBC_RESOLVER_ID = "rollapp-events-0.0.0";
export const DYMENSION_ROLLAPP_IBC_RESOLVER_INPUT = {
  endpoint:
    "https://froopyland.blockpi.network/rpc/v1/0837569d56317f9a6af3c82170a7242ce8319ae4",
} as const;

export const OG_SIZE = {
  width: 1600,
  height: 900,
};

export const ALWAYS_ONLINE_NETWORKS = ["celestia", "eclipse"];
export const LOCAL_CHAIN_CACHE_DIR = ".next/cache/local-chains";
