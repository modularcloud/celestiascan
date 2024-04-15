import { NextRequest } from "next/server";
import { env } from "~/env";
import slugify from "@sindresorhus/slugify";
import type { SingleNetwork } from "~/lib/network";
import { generateRandomString } from "~/lib/shared-utils";
import crypto from "crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { CACHE_KEYS } from "~/lib/cache-keys";
import { FileSystemCacheDEV } from "~/lib/fs-cache-dev";
import path from "path";
import { LOCAL_CHAIN_CACHE_DIR } from "~/lib/constants";
import { localChainFormSchema } from "~/app/(register)/register/local-chain/local-chain-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (env.NEXT_PUBLIC_TARGET !== "electron") {
    return Response.json(
      {
        errors: {
          root: ["this feature is only available for the electron target"],
        },
      },
      { status: 403 },
    );
  }

  const fsCache = new FileSystemCacheDEV(
    path.join(env.ROOT_USER_PATH, LOCAL_CHAIN_CACHE_DIR),
  );

  const chainKeys = await fsCache.search(CACHE_KEYS.networks.single("local"));

  const chains = await Promise.all(
    chainKeys.map((key) => fsCache.get<SingleNetwork>(key)),
  );

  return Response.json(chains.filter((chain) => chain !== null));
}

export async function POST(request: NextRequest) {
  if (env.NEXT_PUBLIC_TARGET !== "electron") {
    return Response.json(
      {
        formErrors: ["this feature is only available for the electron target"],
      },
      { status: 403 },
    );
  }

  const result = localChainFormSchema.safeParse(await request.json());
  if (!result.success) {
    return Response.json(result.error.flatten(), { status: 422 });
  }

  const { logo, ...body } = result.data;

  let logoUrl = logo ?? `/images/rollkit-logo.svg`;
  const fsCache = new FileSystemCacheDEV(
    path.join(env.ROOT_USER_PATH, LOCAL_CHAIN_CACHE_DIR),
  );
  const items = await fsCache.search(CACHE_KEYS.networks.single("local"));

  const networkSlug = `local-${slugify(body.chainName)}`;

  const chainData = {
    chainName: body.chainName,
    brand: "local",
    slug: networkSlug,
    config: {
      logoUrl,
      rpcUrls: {
        [body.rpcPlatform]: body.rpcUrl,
      },
      token: {
        name: body.tokenName,
        decimals: body.tokenDecimals,
      },
      ecosystems: [],
      cssGradient: `linear-gradient(97deg, #000 -5.89%, #1E1E1E 83.12%, #000 103.23%)`, // ecplise's default
      primaryColor: "236 15% 18%", // ecplise's default
    },
    namespace: body.namespace,
    startHeight: body.startHeight,
    daLayer: body.daLayer,
    paidVersion: false,
    accountId: generateRandomString(20),
    internalId: items.length + 1,
    integrationId: crypto.randomUUID(),
    createdTime: new Date(),
  } satisfies SingleNetwork;

  const {
    config: { logoUrl: _, ...restConfig },
    ...rest
  } = chainData;
  console.log({
    CONFIG_SAVED: {
      ...rest,
      config: { ...restConfig },
    },
  });

  await fsCache.set(CACHE_KEYS.networks.single(networkSlug), {
    ...chainData,
    createdTime: chainData.createdTime.getTime(),
  });

  const [__, localTag] = CACHE_KEYS.networks.local();
  const [allTag] = CACHE_KEYS.networks.all();
  revalidateTag(allTag);
  revalidateTag(localTag);

  revalidatePath("/", "layout");

  return Response.json({
    success: true,
    data: chainData,
  });
}
