import { NextRequest } from "next/server";
import { env } from "~/env";
import { db } from "~/lib/db";
import { localChains } from "~/lib/db/schema/local-chains.sql";
import { eq } from "drizzle-orm";

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
  const data = await db
    .select()
    .from(localChains)
    .where(eq(localChains.slug, slug));

  return Response.json(data[0] ?? null);
}
