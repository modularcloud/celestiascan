import { EntityBaseSchema } from "@modularcloud/ecs";
import { z } from "zod";
import _slugify from "slugify";

export function convertToHttpIfIpfs(url: string) {
  if (url.startsWith("ipfs://")) {
    return `${process.env.IPFS_GATEWAY}/${url.replace("ipfs://", "")}`;
  }
  return url;
}

// temporarily necessary because sometimes only the ipfs.io gateway works, probably won't help much
export function convertToPublicHttpIfIpfs(url: string) {
  if (url.startsWith("ipfs://")) {
    return `https://ipfs.io/ipfs/${url.replace("ipfs://", "")}`;
  }
  return url;
}

export function decodeEvmAddressParam(address: string) {
  if (address.indexOf("000000000000000000000000") !== -1) {
    return address.replace("000000000000000000000000", "");
  }
  return address;
}

export async function getEventSignatureName(topic: string) {
  try {
    const results = await fetch(
      `https://api.openchain.xyz/signature-database/v1/lookup?event=${topic}&filter=true`,
    ).then((res) => res.json());
    return z.string().parse(results?.result?.event?.[topic]?.[0]?.name);
  } catch {}
}

// wrap loading in a fetch request until we figure out how to best cache using next app routing
export type FetchLoadArgs = { network: string; type: string; query: string };
export async function fetchLoad(props: FetchLoadArgs) {
  try {
    let baseUrl = "http://localhost:3000";
    if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    }
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
      baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }

    let cache: RequestCache = "force-cache";

    if (
      props.type === "account" ||
      props.type === "pagination" ||
      props.type === "address" ||
      props.type === "balances"
    ) {
      cache = "no-store";
    }
    // Since this fetch call is not called with `cache: no-store` it will always be cached
    // However, i suppose blockchain data are immutable ? so this will normally not be a problem
    const response = await fetch(
      `${baseUrl}/api/app/load/${props.network}/${props.type}/${props.query}`,
      {
        cache,
      },
    );
    if (!response.ok) {
      const json = await response.json().catch((_) => {});

      if (json === null) {
        console.log(
          "Error loading entity : No entity was found for these params :",
          props,
        );
      } else {
        console.log("Error loading entity", { json });
      }
      return null;
    }

    return EntityBaseSchema.parse(await response.json());
  } catch (e) {
    console.error(e);
    return null;
  }
}

export type SearchOption = {
  displayName: string;
  id: string;
};
export type OptionGroups = {
  [groupDisplayName: string]: SearchOption[];
};
export type Whitelabel = {
  name: [string] | [string, string];
  searchOptions: OptionGroups;
  defaultNetwork: string;
  subText?: string;
  env: string;
};

export function slugify(str: string): string {
  return _slugify(str, { lower: true, strict: true });
}

export function truncateString(
  address: string,
  numCharsBefore = 6,
  numCharsAfter = 4,
) {
  if (!address) return "";

  if (address.length <= numCharsBefore + numCharsAfter + 2) {
    return address;
  }

  const start = address.slice(0, numCharsBefore);
  const end = numCharsAfter ? address.slice(-numCharsAfter) : "";
  return `${start}....${end}`;
}
