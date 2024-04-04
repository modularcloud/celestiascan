import { NextRequest } from "next/server";
import { FileSystemCacheDEV } from "~/lib/fs-cache-dev";
import fs from "node:fs/promises";
import { env } from "~/env";
import { localChainFormSchema } from "~/app/(register)/register/local-chain/local-chain-form-schema";
import slugify from "@sindresorhus/slugify";
import type { SingleNetwork } from "~/lib/network";
import { CACHE_KEYS } from "~/lib/cache-keys";
import { generateRandomString } from "~/lib/shared-utils";
import crypto from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (env.NEXT_PUBLIC_TARGET === "electron") {
    return Response.json(
      {
        errors: {
          root: ["this feature is only available for the electron target"],
        },
      },
      { status: 403 },
    );
  }
  const result = localChainFormSchema.safeParse(await request.formData());
  if (!result.success) {
    return Response.json(
      {
        errors: result.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const { logo, ...body } = result.data;
  const fsCache = new FileSystemCacheDEV();
  const items = await fsCache.search(CACHE_KEYS.networks.single("local"));

  const networkSlug = `local-${slugify(body.chainName)}`;

  let logoUrl = `/images/rollkit-logo.svg`;
  if (logo) {
    await writeFileToPath(
      `../../../public/images/local-chains/logo-${networkSlug}.png`,
      logo,
    );

    logoUrl = new URL(
      `../../../public/images/local-chains/logo-${networkSlug}.png`,
      import.meta.url,
    ).toString();
  }
  const chainData = {
    chainName: body.chainName,
    brand: "local",
    slug: networkSlug,
    config: {
      rpcUrls: {
        [body.rpcPlatform]: body.rpcUrl,
      },
      token: {
        name: body.tokenName,
        decimals: body.tokenDecimals,
      },
      logoUrl,
      ecosystems: [],
      cssGradient: `linear-gradient(97deg, #000 -5.89%, #1E1E1E 83.12%, #000 103.23%)`, // ecplise's default
      primaryColor: "236 15% 18%", // ecplise's default
    },
    namespace: body.namespace,
    startHeight: body.startHeight,
    daLayer: body.daLayer,
    paidVersion: false,
    accountId: generateRandomString(20),
    internalId: (items.length + 1).toString(),
    integrationId: crypto.randomUUID(),
    createdTime: new Date(),
  } satisfies SingleNetwork;

  await fsCache.set(CACHE_KEYS.networks.single(networkSlug), chainData);
  return Response.json({
    success: true,
  });
}

async function fileToBuffer(file: File) {
  return new Promise<Buffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      const buffer = Buffer.from(arrayBuffer);
      resolve(buffer);
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsArrayBuffer(file);
  });
}

async function writeFileToPath(filePath: string, data: File): Promise<void> {
  await fs.writeFile(filePath, await fileToBuffer(data));
}
