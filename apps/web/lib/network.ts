import "server-only";
import { preprocess, z } from "zod";
import { nextCache } from "./server-utils";
import { env } from "~/env.mjs";
import { CACHE_KEYS } from "./cache-keys";
import { jsonFetch } from "./shared-utils";

export const singleNetworkSchema = z.object({
  config: z.object({
    logoUrl: z.string().url(),
    rpcUrls: z.record(
      z.enum(["evm", "cosmos", "svm", "celestia"]),
      z.string().url(),
    ),
    token: z.object({
      name: z.string().max(128),
      decimals: z.number(),
    }),
    platform: z.string().max(64).optional(),
    // TODO : These are defaulted for now, but it should be returned by the API
    widgetLayout: z
      .enum(["EvmWithPrice", "EvmWithoutPrice", "SVM", "Celestia"])
      .optional()
      .catch(undefined),
    // This is in HSL format, and is used like this : hsl("224 94% 51%")
    primaryColor: z.string().optional().default("256 100% 67%"),
    cssGradient: z
      .string()
      .optional()
      // this value is directly used as `background-image: linear-gradient(90deg, #0F4EF7 -10.76%, #00D5E2 98.22%);`
      .default(
        `linear-gradient(94deg, #6833FF 19.54%, #336CFF 75.56%, #33B6FF 93.7%)`,
      ),
  }),
  paidVersion: z.boolean(),
  slug: z.string(),
  chainName: z.string(),
  chainBrand: z.string(),
  internalId: z.string(),
  integrationId: z.string().uuid(),
  createdTime: preprocess((arg) => new Date(arg as any), z.date()),
});

export type SingleNetwork = z.infer<typeof singleNetworkSchema>;

export async function getAllNetworks(): Promise<Array<SingleNetwork>> {
  let allIntegrations: Array<SingleNetwork> = [];

  if (process.env.NODE_ENV === "development") {
    const value = await jsonFetch<{
      data: Array<SingleNetwork> | null;
    }>(`http://localhost:3000/api/fs-cache?key=all-networks`);
    if (value.data) {
      allIntegrations = value.data;
      return allIntegrations;
    }
  }

  if (allIntegrations.length === 0) {
    try {
      let nextToken: string | undefined = "";

      do {
        const response = await fetch(
          `${env.INTERNAL_INTEGRATION_API_URL}/integrations-summary?returnAll=true&nextToken=${nextToken}`,
        ).then(async (r) => {
          const text = await r.text();
          const status = r.status;
          if (status !== 200) {
            console.log({
              res: text,
              status: r.status,
              statusText: r.statusText,
            });
          }
          return JSON.parse(text);
        });

        const integrationSummaryAPISchema = z.object({
          result: z
            .object({
              integrations: z.array(singleNetworkSchema.nullable().catch(null)),
              nextToken: z.string(),
            })
            .nullish(),
        });
        const { result } = integrationSummaryAPISchema.parse(response);
        nextToken = result?.nextToken;

        if (result?.integrations) {
          // @ts-expect-error
          allIntegrations = [
            ...allIntegrations,
            ...result.integrations.filter(Boolean),
          ];
        }
      } while (nextToken);
    } catch (error) {
      console.dir({ "Error fetching networks : ": error }, { depth: null });
    }
  }

  allIntegrations = allIntegrations.sort((a, b) => {
    // prioritize celestia before every other chain
    if (a.chainBrand === "celestia") return -1;
    if (a.chainBrand === "celestia") return 1;

    // put non paid chains at the end
    if (!a.paidVersion) return 1;
    if (!b.paidVersion) return -1;
    return 0;
  });

  if (process.env.NODE_ENV === "development") {
    await jsonFetch<{
      data: Array<SingleNetwork> | null;
    }>(`http://localhost:3000/api/fs-cache`, {
      method: "POST",
      body: {
        key: "all-networks",
        value: allIntegrations,
      },
    });
  }

  return allIntegrations;
}

export async function getSingleNetwork(slug: string) {
  const describeIntegrationBySlugAPISchema = z.object({
    result: z.object({
      integration: singleNetworkSchema,
    }),
  });

  try {
    let integration: SingleNetwork | null = null;

    // Get the cached data in the File System Cache in DEV
    if (process.env.NODE_ENV === "development") {
      const value = await jsonFetch<{
        data: SingleNetwork | null;
      }>(
        `http://localhost:3000/api/fs-cache?key=single-network-${encodeURIComponent(
          slug,
        )}`,
      );
      if (value.data) {
        integration = value.data;
      }
    }

    if (!integration) {
      let { result } = await fetch(
        `${
          env.INTERNAL_INTEGRATION_API_URL
        }/integrations/slug/${encodeURIComponent(slug)}`,
      )
        .then((r) => r.json())
        .then((data) => describeIntegrationBySlugAPISchema.parse(data));
      integration = result.integration;

      // Cache the data in the File System Cache in DEV
      if (process.env.NODE_ENV === "development") {
        await jsonFetch<{
          data: Array<SingleNetwork> | null;
        }>(`http://localhost:3000/api/fs-cache`, {
          method: "POST",
          body: {
            key: `single-network-${integration.slug}`,
            value: integration,
          },
        });
      }
    }

    // FIXME : this is hardcoded because widgets are not supported yet on other networks other than these
    if (integration.slug === "nautilus-mainnet") {
      integration.config.widgetLayout = "EvmWithPrice";
    }
    if (integration.slug === "eclipse-devnet") {
      integration.config.widgetLayout = "SVM";
      integration.config.primaryColor = "236 15% 18%";
      integration.config.cssGradient = `linear-gradient(97deg, #000 -5.89%, #1E1E1E 83.12%, #000 103.23%)`;
    }
    if (integration.chainBrand === "celestia") {
      integration.config.widgetLayout = "Celestia";
      integration.config.primaryColor = "256 100% 67%";
      integration.config.cssGradient = `linear-gradient(94deg, #6833FF 19.54%, #336CFF 75.56%, #33B6FF 93.7%)`;
    }

    return integration;
  } catch (error) {
    return null;
  }
}

export async function getAllNetworksCached() {
  const getAllIntegrationsFn = nextCache(getAllNetworks, {
    tags: CACHE_KEYS.networks.summary(),
  });

  return await getAllIntegrationsFn();
}

export async function getSingleNetworkCached(slug: string) {
  const getSingleIntegrationFn = nextCache(getSingleNetwork, {
    tags: CACHE_KEYS.networks.single(slug),
  });
  return await getSingleIntegrationFn(slug);
}

export async function getAllPaidNetworks() {
  // `getAllNetworksCached` doesn't work during `next build`, so we manually call `getAllNetworks()`
  const allNetworks = await (env.NEXT_PUBLIC_VERCEL_URL
    ? getAllNetworksCached()
    : getAllNetworks());
  return allNetworks.filter((network) => network.paidVersion).slice(0, 30);
}

export async function getNetworksForPlatform(platform: string) {
  const allNetworks = await (env.NEXT_PUBLIC_VERCEL_URL
    ? getAllNetworksCached()
    : getAllNetworks());

  return allNetworks.filter((network) => network.config.platform === platform);
}
export async function getNetworksForPlatformCached(platform: string) {
  const getNetworksForPlatformFn = nextCache(getNetworksForPlatform, {
    tags: CACHE_KEYS.networks.platform(platform),
  });

  return await getNetworksForPlatformFn(platform);
}
