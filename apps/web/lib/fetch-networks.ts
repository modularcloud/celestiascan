import { env } from "~/env.mjs";
import { z } from "zod";
import { capitalize } from "./shared-utils";

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
    description: z.string().optional(),
    type: z.string().optional().default("Execution Layer"),
    links: z
      .array(
        z.object({
          type: z.enum(["website", "github", "x", "discord"]),
          href: z.string().url(),
        }),
      )
      .optional()
      .default([]),
    badges: z
      .array(
        z.object({
          relation: z.string().nonempty(),
          target: z.string().nonempty(),
          logoURL: z.string().optional(),
          href: z.string().optional(),
        }),
      )
      .default([]),
    featuredChains: z
      .array(
        z.object({
          logoUrl: z.string(),
          name: z.string(),
          link: z.string().optional(),
        }),
      )
      .optional(),
  }),
  paidVersion: z.boolean(),
  slug: z.string(),
  chainName: z.string(),
  brand: z.string(),
  accountId: z.string(),
  internalId: z.string(),
  integrationId: z.string().uuid(),
  createdTime: z.coerce.date(),
});

export type SingleNetwork = z.infer<typeof singleNetworkSchema>;

export async function fetchSingleNetwork(slug: string) {
  const describeIntegrationBySlugAPISchema = z.object({
    result: z.object({
      integration: singleNetworkSchema,
    }),
  });

  try {
    let integration: SingleNetwork | null = null;

    if (!integration) {
      let { result } = await fetch(
        `${
          env.INTERNAL_INTEGRATION_API_URL
        }/integrations/slug/${encodeURIComponent(slug)}`,
        {
          cache: "force-cache",
        },
      )
        .then((r) => r.json())
        .then((data) => describeIntegrationBySlugAPISchema.parse(data));

      integration = result.integration;
    }

    let baseUrl = env.NEXT_PUBLIC_VERCEL_URL ?? "http://127.0.0.1:3000";
    if (process.env.VERCEL_ENV === "production") {
      baseUrl = env.NEXT_PUBLIC_PRODUCTION_URL;
    }

    // FIXME : this is hardcoded because widgets are not supported yet on other networks other than these
    if (integration.slug === "nautilus-mainnet") {
      integration.config.widgetLayout = "EvmWithPrice";
    }
    integration.config = {
      ...integration.config,
      ...getDefaultIntegrationConfigValues(integration),
    };

    return integration;
  } catch (error) {
    return null;
  }
}

function getDefaultIntegrationConfigValues(
  network: SingleNetwork,
): Partial<SingleNetwork["config"]> {
  if (network.brand === "celestia") {
    return {
      type: "Data Availability Layer",
      widgetLayout: "Celestia",
      primaryColor: "256.07 100% 67.06%",
      cssGradient: `linear-gradient(89deg, #8457FF -17.52%, #501FD7 89.78%)`,
      description:
        "Celestia is a modular data availability network that securely scales with the number of users, making it easy for anyone to launch their own blockchain.",
      links: [
        {
          type: "website",
          href: "https://celestia.org/",
        },
        {
          type: "github",
          href: "https://github.com/celestiaorg",
        },
        {
          type: "discord",
          href: "https://discord.com/invite/YsnTPcSfWQ",
        },
        {
          type: "x",
          href: "https://twitter.com/CelestiaOrg/",
        },
      ],
      featuredChains: [
        {
          name: "Manta Network",
          logoUrl: `/images/logo-mantra-network.svg`,
        },
        {
          name: "Lyra",
          logoUrl: `/images/logo-lyra.svg`,
        },
        {
          name: "Aevo",
          logoUrl: `/images/logo-aevo.svg`,
        },
        {
          name: "Hypr",
          logoUrl: `/images/logo-hypr.svg`,
        },
        {
          name: "Orderly",
          logoUrl: `/images/logo-orderly.svg`,
        },
        {
          name: "Public Goods Network",
          logoUrl: `/images/logo-public-goods-network.svg`,
        },
      ],
    };
  }
  if (network.brand === "eclipse") {
    return {
      widgetLayout: "SVM",
      primaryColor: "119.25 33.33% 52.94%",
      cssGradient: `linear-gradient(180deg, #65BB64 0%, #569B55 99.99%, #000 100%)`,
      description:
        "Eclipse is Ethereum's fastest L2, powered by the Solana Virtual Machine.",
      links: [
        {
          type: "website",
          href: "https://www.eclipse.builders/",
        },
        {
          type: "github",
          href: "https://github.com/Eclipse-Laboratories-Inc",
        },
        {
          type: "x",
          href: "https://twitter.com/EclipseFND",
        },
      ],
      badges: [
        {
          relation: "Settlement",
          target: "Sepolia",
          logoURL: `/images/ethereum.png`,
        },
        {
          relation: "DA",
          target: "Mocha",
          logoURL: `/images/celestia-logo-small.png`,
          href: "/celestia-mocha",
        },
      ],
    };
  }
  if (network.brand === "dymension") {
    return {
      type: "settlement layer",
      widgetLayout: "Dymension",
      cssGradient: `linear-gradient(89deg, #24201F -17.52%, #24201F 89.78%)`,
      primaryColor: "12 7.46% 13.14%",
      description:
        "Dymension is a home for easily deployable and lightning fast app-chains, called RollApps.",
      links: [
        {
          type: "website",
          href: "https://portal.dymension.xyz",
        },
        {
          type: "github",
          href: "https://github.com/dymensionxyz",
        },
        {
          type: "x",
          href: "https://twitter.com/dymension",
        },
      ],
      featuredChains: [
        {
          name: "EpicWar Zone",
          logoUrl: `/images/logo-epicwar-zone.svg`,
          link: "/epicwarzone_3603467-1",
        },
        {
          name: "Owlstake Testnet",
          logoUrl: `/images/logo-owlstake-testnet.svg`,
          link: "/ngocdoan_5367226-1",
        },
        {
          name: "Mushi GameCenter",
          logoUrl: `/images/logo-mushi-gamecenter.svg`,
          link: "/mushi_4443145-1",
        },
        {
          name: "Equinox",
          logoUrl: `/images/logo-equinox.svg`,
          link: "/equinox_4582305-1",
        },
      ],
    };
  }

  if (network.config.platform === "dymension") {
    return {
      description: `${capitalize(network.brand)} is a RollApp deployed to Dymension's Froopyland Testnet.`,
    };
  }

  return {};
}

function formatEcosystemName(ecosystem: string) {
  const nameParts = ecosystem.split("-").filter(Boolean);
  return nameParts.map((str) => capitalize(str)).join(" ");
}

export async function fetchAllNetworks() {
  let allIntegrations: Array<SingleNetwork> = [];

  let nextToken: string | null = null;

  do {
    const sp = new URLSearchParams({
      returnAll: "true",
      maxResults: "1000",
      nextToken: nextToken ?? "",
    });
    const response = await fetch(
      `${
        env.INTERNAL_INTEGRATION_API_URL
      }/integrations-summary?${sp.toString()}`,
      { cache: "force-cache" },
    ).then(async (r) => {
      const text = await r.text();
      const status = r.status;
      if (status !== 200) {
        console.log({
          res: text,
          status: r.status,
          statusText: r.statusText,
          url: r.url,
        });
        throw new Error(text);
      }
      return JSON.parse(text);
    });

    const integrationSummaryAPISchema = z.object({
      result: z
        .object({
          integrations: z.array(singleNetworkSchema.nullable().catch(null)),
          nextToken: z.string().nullish(),
        })
        .nullish(),
    });
    const { result } = integrationSummaryAPISchema.parse(response);
    nextToken = result?.nextToken ?? null;

    if (result?.integrations) {
      for (const integration of result.integrations) {
        if (integration !== null) {
          integration.config = {
            ...integration.config,
            ...getDefaultIntegrationConfigValues(integration),
          };
          allIntegrations.push(integration);
        }
      }
    }
  } while (nextToken);

  return allIntegrations.sort((a, b) => {
    // prioritize celestia before every other chain
    if (a.brand === "celestia") return -1;
    if (b.brand === "celestia") return 1;

    // put non paid chains at the end
    if (!a.paidVersion) return 1;
    if (!b.paidVersion) return -1;
    return 0;
  });
}
