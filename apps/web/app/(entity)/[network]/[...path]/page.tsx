import * as React from "react";
import { Overview, OverviewSkeleton } from "~/ui/entity/overview";
import { loadPage, HeadlessRoute, search } from "~/lib/headless-utils";
import { Table } from "~/ui/entity/table";
import { capitalize, parseHeadlessRouteVercelFix } from "~/lib/shared-utils";
import { notFound, redirect } from "next/navigation";
import { getSingleNetworkCached } from "~/lib/network";

export async function generateMetadata({
  params: _params,
}: {
  params: HeadlessRoute;
}) {
  const params = parseHeadlessRouteVercelFix(_params);
  if (params.path[0] === "search") {
    const query = params.path[1];
    return {
      title: `Searching for ${query}`,
    };
  }
  const network = await getSingleNetworkCached(params.network);
  if (!network) {
    return {};
  }

  // Special cases
  if (
    params.path.length === 1 &&
    (params.path[0] === "transactions" || params.path[0] === "blocks")
  ) {
    return {
      title: `Latest ${capitalize(params.path[0])} on ${capitalize(
        network.brand,
      )} ${capitalize(network.chainName)}`,
      description: `Latest ${capitalize(params.path[0])} on ${capitalize(
        network.brand,
      )} ${capitalize(network.chainName)}, brought to you by Modular Cloud.`,
    };
  }

  function shortenId(str: string) {
    if (str.length < 12) {
      return str;
    }
    if (str.match(/^(?:[0-9]+\.){3}[0-9]+$/)) {
      return str.substring(0, 12) + "...";
    }
    return str.slice(0, 6) + "..." + str.slice(-6);
  }

  const pluralToSingular: Record<string, string> = {
    addresses: "address",
  };

  const formatMap: Record<string, string> = {
    eth: "ETH",
    spl: "SPL",
  };

  function formatTypeName(str: string, singular?: boolean) {
    const parts = str.split("-");
    return parts
      .map((part, index) => {
        if (singular && index === parts.length - 1) {
          let mappedSingular = pluralToSingular[part.toLowerCase()];
          if (mappedSingular) {
            return capitalize(mappedSingular);
          }
          if (part.endsWith("s")) {
            return capitalize(str.slice(0, -1));
          }
        }
        return formatMap[part.toLowerCase()] || capitalize(part);
      })
      .join(" ");
  }

  let titleParts = [];
  let descriptionParts = [];
  for (let i = 0; i < params.path.length; i += 2) {
    const type = params.path[i];
    const id = params.path[i + 1];

    if (!id) {
      titleParts.unshift(formatTypeName(type));
      descriptionParts.unshift(formatTypeName(type));
      break;
    }

    titleParts.unshift(`${formatTypeName(type, true)} ${shortenId(id)}`);
    descriptionParts.unshift(`${formatTypeName(type, true)} ${id}`);
  }

  return {
    title: `${titleParts.join(" - ")} - ${capitalize(
      network.brand,
    )} ${capitalize(network.chainName)}`,
    description: `${descriptionParts.join(" in ")} on ${capitalize(
      network.brand,
    )} ${capitalize(network.chainName)}, brought to you by Modular Cloud.`,
  };
}

export default function EntityPage({ params }: { params: HeadlessRoute }) {
  const pathParams = parseHeadlessRouteVercelFix(params);

  return (
    <React.Suspense fallback={<OverviewSkeleton />}>
      <AyncPageContent params={pathParams} />
    </React.Suspense>
  );
}

async function AyncPageContent({ params }: { params: HeadlessRoute }) {
  const entityType = params.path[0];

  if (entityType === "search") {
    const query = params.path[1];
    const redirectPath = await search(params.network, query);

    if (redirectPath) {
      redirect(`/${params.network}/${redirectPath.join("/")}`);
    } else {
      notFound();
    }
  }

  try {
    const page = await loadPage({ route: params });

    if (page.body.type === "notebook") {
      return <Overview properties={page.body.properties} isIBC={page.isIBC} />;
    }

    return <Table initialData={page} route={params} />;
  } catch (error) {
    notFound();
  }
}
