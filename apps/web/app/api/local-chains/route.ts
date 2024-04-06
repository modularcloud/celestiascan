import { NextRequest } from "next/server";
import { env } from "~/env";
import { localChainFormSchema } from "~/app/(register)/register/local-chain/local-chain-form-schema";
import slugify from "@sindresorhus/slugify";
import type { SingleNetwork } from "~/lib/network";
import { generateRandomString } from "~/lib/shared-utils";
import crypto from "crypto";
import { fileTypeFromBlob } from "file-type";
import { db } from "~/lib/db";
import { localChains } from "~/lib/db/schema/local-chains.sql";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return Response.json(db.select().from(localChains).all());
}

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
  const networkSlug = `local-${slugify(body.chainName)}`;

  let logoUrl = `/images/rollkit-logo.svg`;
  if (logo) {
    const base64Data = Buffer.from(await logo.arrayBuffer()).toString("base64");
    const { mime } = (await fileTypeFromBlob(logo))!;
    logoUrl = `data:${mime};base64,${base64Data}`;
  }

  const existingLocalChains = db.select().from(localChains).all();

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
    internalId: (existingLocalChains.length + 1).toString(),
    integrationId: crypto.randomUUID(),
    createdTime: new Date(),
  } satisfies SingleNetwork;

  await db
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
    });

  return Response.json({
    success: true,
  });
}
