import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { capitalize } from "~/lib/shared-utils";
import { Button } from "~/ui/button";
import { ArCube } from "~/ui/icons";
import { cn } from "~/ui/shadcn/utils";

export type BlobStreamPageProps = {
  params: {
    network: string;
  };
  searchParams?: {
    stream?: string;
  };
};

export function generateMetadata(props: BlobStreamPageProps) {
  const names = props.params.network.split("-");
  const formattedName = names.map(capitalize).join(" ");
  return {
    title: `${formattedName} Blobstream`,
  };
}

export default function BlobStreamPage({ searchParams }: BlobStreamPageProps) {
  const streamSources = ["arbitrum_one", "base"];

  const selectedStream = streamSources.includes(searchParams?.stream ?? "")
    ? searchParams?.stream
    : streamSources[0];
  return (
    <main
      className="max-w-4xl mx-auto my-12"
      style={{
        "--color-primary": "212 100% 49%",
      }}
    >
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1 mb-4">
          <h1 className="text-3xl font-medium">Blobstream</h1>
          <h2 className="text-muted">Select to see blob streams:</h2>
        </div>

        <div className="flex gap-6">
          <BlobStreamImageCard
            image="/images/arbitrum_one.svg"
            title="Arbitrum One"
            subtitle="lorem ipsum dolor sit atmet"
            link="?stream=arbitrum_one"
            selected={selectedStream === "arbitrum_one"}
          />
          <BlobStreamImageCard
            image="/images/base.svg"
            title="Base"
            subtitle="lorem ipsum dolor sit atmet"
            link="?stream=base"
            selected={selectedStream === "base"}
          />
          <BlobStreamImageCard
            image="/images/ethereum.png"
            title="Ethereum"
            subtitle="lorem ipsum dolor sit atmet"
            link="#"
          />
        </div>
        <div className="flex relative items-center justify-center border py-3 rounded-lg bg-primary/5 overflow-hidden">
          <div
            className="absolute top-0 bottom-0 left-0 right-2/3 bg-gradient-to-r from-primary to-transparent"
            style={{
              maskImage: `url('/images/dots-mask.svg')`,
              maskSize: "contain",
            }}
          />
          <dl className="flex flex-col gap-2 items-center">
            <div className="flex items-center gap-1">
              <ArCube className="h-4 w-4 text-primary" aria-hidden="true" />
              <dt>Latest Block on Celestia</dt>
              <span className="" aria-hidden="true">
                -
              </span>
              <dd>1300</dd>
            </div>
            <div className="flex items-center gap-1">
              <ArCube className="h-4 w-4 text-primary" aria-hidden="true" />
              <dt>Latest Synched Block </dt>
              <span className="" aria-hidden="true">
                -
              </span>
              <dd>1000</dd>
            </div>
          </dl>
          <div
            className="absolute top-0 bottom-0 right-0 left-2/3 bg-gradient-to-l from-primary to-transparent"
            style={{
              maskImage: `url('/images/dots-mask.svg')`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "top right",
            }}
          />
        </div>

        <table className="rounded-lg text-left">
          <thead>
            <tr className="">
              <th className="font-medium bg-muted-100 rounded-tl-lg px-3 py-2 border">
                Transfer
              </th>
              <th className="font-medium bg-muted-100 px-3 py-2 border">
                File
              </th>
              <th className="font-medium bg-muted-100 rounded-tr-lg px-3 py-2 border">
                Time
              </th>
            </tr>
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

type BlobStreamImageCardProps = {
  className?: string;
  image: string;
  title: string;
  subtitle: string;
  selected?: boolean;
  link: string;
  isUnavailable?: boolean;
};

function BlobStreamImageCard({
  className,
  image,
  title,
  subtitle,
  link,
  selected = false,
  isUnavailable = false,
}: BlobStreamImageCardProps) {
  return (
    <div
      className={cn(
        "relative flex items-start justify-between px-4 py-3 rounded-lg border-2",
        "w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary",
        selected && "border-primary",
        className,
      )}
    >
      <div className="flex flex-col gap-3 flex-grow">
        <Image
          src={image}
          alt={`Logo ${title}`}
          className="object-contain object-center h-8 w-8"
          width={32}
          height={32}
        />

        <div>
          <Link
            className="font-medium before:absolute before:inset-0 focus:outline-none"
            href={link}
            aria-current={selected && "page"}
          >
            {title}
          </Link>
          <p className="text-muted text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="w-12 relative" aria-hidden="true">
        <div
          className={cn(
            "h-5 w-5 flex-none absolute top-0 right-0 rounded-full border flex items-center justify-center",
            selected ? "bg-primary border-primary" : "bg-muted-100",
          )}
        >
          {selected && (
            <div className="bg-white shadow-md h-2 w-2 rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export const runtime = "edge";
