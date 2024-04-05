import { NextRequest } from "next/server";
import { FileSystemCacheDEV } from "~/lib/fs-cache-dev";
import fs from "fs/promises";
import { env } from "~/env";
import { localChainFormSchema } from "~/app/(register)/register/local-chain/local-chain-form-schema";
import slugify from "@sindresorhus/slugify";
import type { SingleNetwork } from "~/lib/network";
import { CACHE_KEYS } from "~/lib/cache-keys";
import { generateRandomString } from "~/lib/shared-utils";
import crypto from "crypto";
import { fileTypeFromBlob } from "file-type";

export async function POST(request: NextRequest) {
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
  const formData = await request.formData();
  const logoFile = formData.get("logo");

  if (logoFile instanceof File) {
    const logoImageType = await fileTypeFromBlob(logoFile);
    if (!logoImageType) {
      return Response.json(
        {
          formErrors: ["The file you tried to upload is not an image."],
        },
        { status: 422 },
      );
    }
  }

  const result = await localChainFormSchema.safeParseAsync(formData);
  if (!result.success) {
    return Response.json(result.error.flatten(), { status: 422 });
  }

  const { logo, ...body } = result.data;
  const fsCache = new FileSystemCacheDEV();
  const items = await fsCache.search(CACHE_KEYS.networks.single("local"));

  const networkSlug = `local-${slugify(body.chainName)}`;

  let logoUrl = `/images/rollkit-logo.svg`;
  if (logo) {
    await writeFileToPath(
      `./public/images/local-chains/logo-${networkSlug}.png`,
      logo,
    );

    logoUrl = `/images/local-chains/logo-${networkSlug}.png`;
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
  const fsCacheForLibFolder = new FileSystemCacheDEV("./lib/cache");

  const integrationList =
    (await fsCacheForLibFolder.get<SingleNetwork[]>("integration-summary")) ??
    [];

  const chainIndex = integrationList.findIndex(
    (item) => item.slug === networkSlug,
  );
  if (chainIndex !== -1) {
    integrationList.splice(chainIndex, 1);
  }
  integrationList.push(chainData);

  await fsCacheForLibFolder.set("integration-summary", integrationList);

  return Response.json({
    success: true,
  });
}

async function writeFileToPath(filePath: string, blob: Blob): Promise<void> {
  const buffer = Buffer.from(await blob.arrayBuffer());
  await fs.writeFile(filePath, buffer);
}
