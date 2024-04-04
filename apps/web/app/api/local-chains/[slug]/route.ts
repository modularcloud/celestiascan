import { NextRequest } from "next/server";
import { FileSystemCacheDEV } from "~/lib/fs-cache-dev";
import { env } from "~/env";
import type { SingleNetwork } from "~/lib/network";
import { CACHE_KEYS } from "~/lib/cache-keys";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  ctx: { params: { slug: string } },
) {
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

  const slug = ctx.params.slug;
  const baseURL = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
  const fsCache = new FileSystemCacheDEV();
  let data = await fsCache.get<SingleNetwork>(CACHE_KEYS.networks.single(slug));

  if (data !== null) {
    data = {
      ...data,
      config: { ...data.config, logoUrl: `${baseURL}/${data.config.logoUrl}` },
    };
  }
  return Response.json(data);
}
