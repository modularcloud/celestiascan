import { NextRequest } from "next/server";
import { env } from "~/env";
import { FileSystemCacheDEV } from "~/lib/fs-cache-dev";
import path from "path";
import { CACHE_KEYS } from "~/lib/cache-keys";
import { LOCAL_CHAIN_CACHE_DIR } from "~/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  ctx: { params: { slug: string } },
) {
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

  const slug = ctx.params.slug;
  const fsCache = new FileSystemCacheDEV(
    path.join(env.ROOT_USER_PATH, LOCAL_CHAIN_CACHE_DIR),
  );

  return Response.json(await fsCache.get(CACHE_KEYS.networks.single(slug)));
}
