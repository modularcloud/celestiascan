import "server-only";
import { z } from "zod";
import { env } from "~/env.js";
import { CACHE_KEYS } from "./cache-keys";
import { cache } from "react";
import { integrations, integrationList } from "~/lib/cache";
import { jsonFetch } from "~/lib/shared-utils";

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
      .enum(["EvmWithPrice", "EvmWithoutPrice", "SVM", "Celestia", "Dymension"])
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
    ecosystems: z.array(z.string()).optional().default([]),
  }),
  paidVersion: z.boolean(),
  slug: z.string(),
  chainName: z.string(),
  brand: z.string(),
  accountId: z.string(),
  internalId: z.string(),
  integrationId: z.string().uuid(),
  createdTime: z.coerce.date(),
  namespace: z.string().optional(),
  startHeight: z.string().optional(),
});

export type SingleNetwork = z.infer<typeof singleNetworkSchema>;

const allNetworkSchema = z.array(singleNetworkSchema);

export const getAllNetworks = cache(function getAllNetworks() {
  return allNetworkSchema.parse(integrationList.value);
});

export const getSingleNetwork = cache(async function getSingleNetwork(
  slug: string,
) {
  if (env.NEXT_PUBLIC_TARGET === "electron" && slug.startsWith("local")) {
    try {
      return await fetch(
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        `http://127.0.0.1/${process.env.PORT}/api/local-chains/${slug}`,
      )
        .then((r) => r.json())
        .then(singleNetworkSchema.parse);
    } catch (error) {
      return null;
    }
  }

  try {
    // @ts-expect-error
    const found = integrations[slug].value;
    return singleNetworkSchema.parse(found);
  } catch (error) {
    return await getSingleNetworkFetch(slug);
  }
});

async function getSingleNetworkFetch(slug: string) {
  const describeIntegrationBySlugAPISchema = z.object({
    result: z.object({
      integration: singleNetworkSchema,
    }),
  });

  try {
    let integration: SingleNetwork | null = null;

    if (!integration) {
      const date = new Date().getTime();
      console.time(
        `[${date}] FETCH [${CACHE_KEYS.networks.single(slug).join(", ")}]`,
      );
      let { result } = await fetch(
        `${
          env.INTERNAL_INTEGRATION_API_URL
        }/integrations/slug/${encodeURIComponent(slug)}`,
        {
          cache: "force-cache",
          next: {
            tags: CACHE_KEYS.networks.single(slug),
          },
        },
      )
        .then((r) => r.json())
        .then((data) => describeIntegrationBySlugAPISchema.parse(data));
      console.timeEnd(
        `[${date}] FETCH [${CACHE_KEYS.networks.single(slug).join(", ")}]`,
      );
      integration = result.integration;
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
    if (integration.brand === "celestia") {
      integration.config.widgetLayout = "Celestia";
      integration.config.primaryColor = "256 100% 67%";
      integration.config.cssGradient = `linear-gradient(94deg, #6833FF 19.54%, #336CFF 75.56%, #33B6FF 93.7%)`;
    }
    if (integration.brand === "dymension") {
      integration.config.widgetLayout = "Dymension";
      integration.config.primaryColor = "29 13% 45%";
    }
    return integration;
  } catch (error) {
    return null;
  }
}

export const getAllPaidNetworks = cache(async function getAllPaidNetworks() {
  const allNetworks = getAllNetworks();
  return allNetworks.filter((network) => network.paidVersion).slice(0, 30);
});
