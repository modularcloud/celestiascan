import { NextRequest } from "next/server";
import { env } from "~/env";
import { localChainFormSchema } from "~/app/(register)/register/local-chain/local-chain-form-schema";
import slugify from "@sindresorhus/slugify";
import type { SingleNetwork } from "~/lib/network";
import { generateRandomString } from "~/lib/shared-utils";
import crypto from "crypto";
import { fileTypeFromBlob } from "file-type";
import { getDbClient } from "~/lib/db";
import { localChains } from "~/lib/db/schema/local-chains.sql";
import { revalidatePath, revalidateTag } from "next/cache";
import { CACHE_KEYS } from "~/lib/cache-keys";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return Response.json(
    await getDbClient().then((db) => db.select().from(localChains)),
  );
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

  let logoUrl = `/images/rollkit-logo.svg`;
  if (logo) {
    const base64Data = Buffer.from(await logo.arrayBuffer()).toString("base64");
    const fileType = await fileTypeFromBlob(logo);
    if (fileType?.mime) {
      logoUrl = `data:${fileType.mime};base64,${base64Data}`;
    }
  }

  const db = await getDbClient();

  const existingLocalChains = await db.select().from(localChains);

  const chainData = {
    chainName: body.chainName,
    brand: "local",
    slug: `local-${slugify(body.chainName)}`,
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
    internalId: existingLocalChains.length + 1,
    integrationId: crypto.randomUUID(),
    createdTime: new Date(),
  } satisfies SingleNetwork;

  const {
    config: { logoUrl: _, ...restConfig },
    ...rest
  } = chainData;
  console.log({
    ...rest,
    config: { ...restConfig },
  });

  const data = await db
    .insert(localChains)
    .values(chainData)
    .onConflictDoUpdate({
      target: localChains.slug,
      set: {
        config: chainData.config,
        namespace: chainData.namespace,
        startHeight: chainData.startHeight,
        daLayer: chainData.daLayer,
      },
    })
    .returning();

  revalidatePath("/", "layout");
  for (const tag of CACHE_KEYS.networks.local()) {
    revalidateTag(tag);
  }

  return Response.json({
    success: true,
    data: data[0],
  });
}
