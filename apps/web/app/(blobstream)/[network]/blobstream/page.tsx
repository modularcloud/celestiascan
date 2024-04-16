import type { Metadata } from "next";
import { capitalize } from "~/lib/shared-utils";
import { Button } from "~/ui/button";

export type BlobStreamPageProps = {
  params: {
    network: string;
  };
};

export function generateMetadata(props: BlobStreamPageProps) {
  const names = props.params.network.split("-");
  const formattedName = names.map(capitalize).join(" ");
  return {
    title: `${formattedName} Blobstream`,
  };
}

export default function BlobStreamPage({ params }: BlobStreamPageProps) {
  return (
    <main
      className="max-w-3xl mx-auto my-12"
      style={{
        "--color-primary": "212 100% 49%",
      }}
    >
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1 mb-4">
          <h1 className="text-3xl font-medium">Blobstream</h1>
          <h2 className="text-muted">Select to see blob streams:</h2>
        </div>

        <div className="flex gap-6"></div>
        <div className="flex relative items-center justify-center border py-3 rounded-lg bg-primary/5 overflow-hidden">
          <div></div>
          <dl className="flex flex-col gap-2 items-center">
            <div className="flex">
              <dt>Latest Block on Celestia</dt>&nbsp;
              <span className="" aria-hidden="true">
                -
              </span>
              &nbsp;
              <dd>1300</dd>
            </div>
            <div className="flex">
              <dt>Latest Synched Block </dt>&nbsp;
              <span className="" aria-hidden="true">
                -
              </span>
              &nbsp;
              <dd>1000</dd>
            </div>
          </dl>
          <div></div>
        </div>

        <table>
          <thead>
            <th className="font-medium">Transfer</th>
            <th className="font-medium">File</th>
            <th className="font-medium">Time</th>
          </thead>
          <tbody></tbody>
        </table>

        <Button
          color="primary"
          className="text-center items-center justify-center"
        >
          Load more
        </Button>

        <div className="border flex items-stretch bg-muted-100 rounded-md">
          <div className="px-3 py-1.5">Contract Address</div>
          <div className="border h-full w-px" />
        </div>
      </section>
    </main>
  );
}

export const runtime = "edge";
