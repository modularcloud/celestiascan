import { Engine, verifyArchetype } from "@modularcloud/ecs";
import { PageArchetype } from "~/ecs/archetypes/page";
import { getEngine } from "~/lib/engine";
import { NextResponse } from "next/server";
import { APICORSHeaders } from "~/lib/server-utils";

import type { FetchLoadArgs } from "~/lib/shared-utils";

type EngineLoadResponse = Awaited<ReturnType<typeof Engine.load>>;

export async function GET(_: Request, { params }: { params: FetchLoadArgs }) {
  let data: EngineLoadResponse | null = null;
  const result = await getEngine(params.network);

  if (result) {
    const { Engine, config } = result;
    try {
      // temporarily add address/token as search types until we can implement redirections
      if (
        params.type === "search" ||
        params.type === "account" ||
        params.type === "token"
      ) {
        const types = Object.keys(config.loaders);
        data = await Promise.any(
          types
            .map(async (type) => {
              return Engine.load({
                ...params,
                type,
              } as any);
            })
            .map((p) =>
              p.then((entity) => verifyArchetype(PageArchetype, entity)),
            ),
        );
      } else {
        data = await Engine.load(params);
      }
    } catch (e) {
      console.error("Error loading entity with params: ", params);
      console.error(e);
    }
  }

  return NextResponse.json(data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    status: data === null ? 404 : 200, // 404 means we have not been able to fetch the data
  });
}

export async function OPTIONS(_: Request) {
  return new Response(null, {
    headers: APICORSHeaders,
  });
}

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";
