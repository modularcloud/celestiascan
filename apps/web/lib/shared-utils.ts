import type { HeadlessRoute } from "./headless-utils";

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

/**
 * Make the 1st char fo a string uppercase and the other lowercase
 * @param str
 * @returns
 */
export function capitalize(str: string) {
  const firstChar = str.charAt(0);
  return firstChar.toUpperCase() + str.substring(1).toLowerCase();
}

/**
 * Group an array into chunks of specified size
 * @example
 *   chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9], 3) // returns: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 *
 * @param array
 * @param chunkSize
 * @returns
 */
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  let result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    let chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}

export function getBaseURL() {
  let baseUrl = "http://localhost:3000";
  if (process.env.VERCEL_URL) {
    baseUrl = `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return baseUrl;
}

/**
 * Truncate a hash string to a maximum length of 24 characters.
 *
 * If the input string is longer than 24 characters, it takes the first 10
 * and last 10 characters, and concatenates them with '...' in between.
 * If the input string is less than or equal to 24 characters, it returns the string as is.
 *
 * @param hash - The hash string to truncate.
 * @returns - The truncated hash string.
 */
export function truncateHash(hash: string, maxLength: number = 23) {
  if (hash.length <= maxLength) {
    return hash;
  }

  const singleSectionLength = Math.floor((maxLength - 3) / 2);

  const start = hash.substring(0, singleSectionLength);
  const end = hash.substring(hash.length - singleSectionLength, hash.length);
  return `${start}...${end}`;
}

export async function copyValueToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
}

/**
 * Generate an array of numbers from start to the end included
 *
 * @example
 *      range(1, 5);
 *      // => [1, 2, 3, 4, 5]
 * @param start
 * @param end
 * @returns
 */
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

/**
 * Wait for the specified amount of time in milliseconds
 *
 * @example
 *  await wait(1000); // will wait for 1 second
 *
 * @param ms the time in milliseconds
 * @returns
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * this is a fix for a bug that only happens on vercel,
 * when you are on a page like : "blocks/9923161/transactions", instead of parsing the path
 * as path: ["blocks", "9923161", "transactions"] it parses it as : [ "blocks%2F9923161%2Ftransactions" ]
 */
export function parseHeadlessRouteVercelFix(params: HeadlessRoute) {
  let path = params.path;
  if (path.length === 1 && path[0].includes("%2F")) {
    path = path[0].split("%2F");
  }

  return {
    ...params,
    path,
  };
}

/**
 * check if the current user is on a mac or PC,
 * this is used to display or listen to `ctrl` or `cmd`
 * @param userAgent
 * @returns
 */
export function isMacLike(userAgent: string | null) {
  return !!userAgent && /(Mac|iPhone|iPod|iPad)/i.test(userAgent);
}

export async function jsonFetch<T>(
  url: string | URL,
  options: Omit<RequestInit, "body"> & {
    body?: Record<string, any>;
  } = {},
): Promise<T> {
  // Set the default headers correctly
  const headers: HeadersInit = new Headers(options.headers);
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  return fetch(url, {
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
    headers,
    credentials: "credentials" in options ? options.credentials : "include",
  })
    .then(async (response) => {
      const text = await response.text();
      if (response.status !== 200) {
        console.log({
          text,
          status: response.status,
          statusText: response.statusText,
        });
      }
      return JSON.parse(text) as T;
    })
    .catch((error) => {
      console.error(
        `[jsonFetch ${options.method ?? "GET"} ${url}] There was an error :`,
        error,
      );
      throw error;
    });
}

export function arrayGroupByTo2DArray<T extends Record<string, any>>(
  array: T[],
  key: keyof T,
) {
  const map = new Map<string, T[]>();

  for (const item of array) {
    const keyValue = item[key];
    if (!map.has(keyValue)) {
      map.set(keyValue, []);
    }
    map.get(keyValue)!.push(item);
  }

  return Array.from(map.values());
}

function shortenId(str: string) {
  if (str.length < 12) {
    return str;
  }
  if (str.match(/^(?:[0-9]+\.){3}[0-9]+$/)) {
    return str.substring(0, 12) + "...";
  }
  return str.slice(0, 6) + "..." + str.slice(-6);
}

function formatTypeName(str: string, singular?: boolean) {
  const pluralToSingular: Record<string, string> = {
    addresses: "address",
  };

  const formatMap: Record<string, string> = {
    eth: "ETH",
    spl: "SPL",
  };
  const parts = str.split("-");

  return parts
    .map((part, index) => {
      if (singular && index === parts.length - 1) {
        let mappedSingular = pluralToSingular[part.toLowerCase()];
        if (mappedSingular) {
          return capitalize(mappedSingular);
        }
        if (part.endsWith("s")) {
          return capitalize(str.slice(0, -1));
        }
      }
      return formatMap[part.toLowerCase()] || capitalize(part);
    })
    .join(" ");
}

export function getMetadata(
  routeParams: HeadlessRoute,
  network: {
    brand: string;
    chainName: string;
  },
) {
  const params = parseHeadlessRouteVercelFix(routeParams);

  if (params.path[0] === "search") {
    const query = params.path[1];
    return {
      title: `Searching for ${query}`,
    };
  }

  // Special cases
  if (
    params.path.length === 1 &&
    (params.path[0] === "transactions" || params.path[0] === "blocks")
  ) {
    return {
      title: `Latest ${capitalize(params.path[0])} on ${capitalize(
        network.brand,
      )} ${capitalize(network.chainName)}`,
      description: `Latest ${capitalize(params.path[0])} on ${capitalize(
        network.brand,
      )} ${capitalize(network.chainName)}, brought to you by Modular Cloud.`,
    };
  }

  let titleParts = [];
  let descriptionParts = [];
  for (let i = 0; i < params.path.length; i += 2) {
    const type = params.path[i];
    const id = params.path[i + 1];

    if (!id) {
      titleParts.unshift(formatTypeName(type));
      descriptionParts.unshift(formatTypeName(type));
      break;
    }

    titleParts.unshift(`${formatTypeName(type, true)} ${shortenId(id)}`);
    descriptionParts.unshift(`${formatTypeName(type, true)} ${id}`);
  }

  return {
    title: `${titleParts.join(" - ")} - ${capitalize(
      network.brand,
    )} ${capitalize(network.chainName)}`,
    description: `${descriptionParts.join(" in ")} on ${capitalize(
      network.brand,
    )} ${capitalize(network.chainName)}, brought to you by Modular Cloud.`,
  };
}

export function generateRandomString(length: number): string {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * 36).toString(36),
  ).join("");
}
