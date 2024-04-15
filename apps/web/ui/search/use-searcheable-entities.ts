import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { env } from "~/env";
import { CACHE_KEYS } from "~/lib/cache-keys";
import { jsonFetch } from "~/lib/shared-utils";

type UseSearcheableEntitiesArgs = {
  network: string;
  query: string;
  enabled: boolean;
};

const searhableEntitiesResponseSchema = z.object({
  data: z.array(z.tuple([z.string(), z.string()])),
});
export function useSearcheableEntities({
  network,
  query,
  enabled,
}: UseSearcheableEntitiesArgs) {
  return useQuery({
    queryKey: CACHE_KEYS.search.query(network, query),
    queryFn: async ({ signal }) => {
      const apiURL = new URL(
        "/api/search",
        env.NEXT_PUBLIC_TARGET === "electron"
          ? "https://explorer.modular.cloud"
          : "",
      );

      apiURL.searchParams.set("query", query);
      apiURL.searchParams.set("networkSlug", network);

      return jsonFetch(apiURL, { signal })
        .then(searhableEntitiesResponseSchema.parse)
        .then((res) => res.data);
    },
    enabled: enabled,
  });
}
