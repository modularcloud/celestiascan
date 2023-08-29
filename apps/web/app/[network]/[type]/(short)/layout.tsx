import EntityLayout from "~/app/[network]/[type]/(standard)/[query]/layout";
import { getWhitelabel } from "~/lib/utils";
import { mapTypes, ShortenedResourcePath } from "./helpers";

type Props = {
  params: ShortenedResourcePath;
  children: React.ReactNode;
};

export default async function ShortEntityLayout({ params, children }: Props) {
  const whitelabel = getWhitelabel();
  return (
    <EntityLayout params={mapTypes(params, whitelabel.defaultNetwork)}>
      {children}
    </EntityLayout>
  );
}

export const dynamic = "force-dynamic";
