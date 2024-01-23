import * as React from "react";
import Link from "next/link";
import { Card } from "~/ui/card";
import {
  ArrowRightGradient,
  ChevronDoubleDown,
  Clock,
  CornerUpRight,
} from "~/ui/icons";
import { ClientTime } from "~/ui/client-time";
import Image from "next/image";
import { cn } from "~/ui/shadcn/utils";
import type { IBCTransferEvent } from "~/lib/dymension-utils";
import { Skeleton } from "~/ui/skeleton";

export type IBCTransferEventCardProps = {
  event: IBCTransferEvent;
  networkSlug: string;
};

function formatAmout(amount: string) {
  const [total, unit] = amount.split(" ");

  const totalAmount = Number(total) / 1_000_000;

  if (isNaN(totalAmount)) {
    return amount;
  }

  const isMoreThanBillions = totalAmount > 999_999_999_999;

  const totalFormatted = new Intl.NumberFormat("en-US", {
    style: "decimal",
    notation: "compact",
    compactDisplay: isMoreThanBillions ? "long" : "short",
  }).format(totalAmount);
  return totalFormatted + " " + unit;
}

export function IBCTransferEventCard({
  event,
  networkSlug,
}: IBCTransferEventCardProps) {
  return (
    <Card className="p-0 grid w-full shadow-none">
      <div className="p-5 rounded-t-lg flex items-start justify-between">
        <Link
          href={`/${networkSlug}/transactions/${event.hash}`}
          className="inline-flex gap-1 px-2 py-1 bg-teal-50 border border-teal-100/75 rounded-md"
        >
          <CornerUpRight className="h-5 w-5 text-teal-500" aria-hidden="true" />
          <span className="text-teal-900">Transfer</span>
        </Link>
        <div className="flex items-center text-muted gap-1">
          <Clock className="h-4 w-4 flex-none" aria-hidden="true" />
          <ClientTime
            time={event.timestamp}
            className="text-end text-xs min-w-[4rem]"
          />
        </div>
      </div>
      <hr className="h-[1px] bg-mid-dark-100" />

      <div
        className={cn(
          "p-5 rounded-b-lg grid w-full place-content-center text-sm",
          "gap-5",
          "tab:grid-cols-5 tab:gap-2",
        )}
      >
        {/* Sender */}
        <div className="tab:col-span-2 flex items-center gap-2 min-w-0 w-full max-w-full">
          <span className="text-muted">From</span>
          <Link
            href={`${event.from.chainSlug}/addresses/${event.from.address}`}
            className="px-2 py-1 border border-mid-dark-100 rounded-md flex-1 inline-flex min-w-0"
          >
            <p className="overflow-x-hidden whitespace-nowrap text-ellipsis flex-shrink flex-grow-0 max-w-full">
              {event.from.address}
            </p>
          </Link>
          <span className="text-muted">on</span>
          <Link
            href={`/${event.from.chainSlug}`}
            className="inline-flex items-center gap-1 px-2 py-1 border border-mid-dark-100 rounded-md flex-1 min-w-0"
          >
            <Image
              className="h-4 w-4 flex-none rounded-full"
              alt=""
              width={20}
              height={20}
              src={event.from.chainLogo}
            />
            <p className="overflow-x-hidden whitespace-nowrap text-ellipsis flex-shrink flex-grow-0 max-w-full">
              {event.from.chainName}
            </p>
          </Link>
        </div>

        {/* Amount */}
        <div
          className={cn(
            "col-span-1 h-full w-full flex items-center justify-center gap-1 py-1",
            "bg-blue-50 border border-blue-100/75 rounded-md tab:border-transparent tab:bg-transparent",
          )}
        >
          <ChevronDoubleDown
            className="h-4 w-4 text-blue-600 tab:hidden"
            aria-hidden="true"
          />
          <ArrowRightGradient
            className="text-blue-600 h-4 hidden tab:block"
            aria-hidden="true"
          />
          <p>{event.amount ? formatAmout(event.amount) : "to"}</p>
          <ChevronDoubleDown
            className="h-4 w-4 text-blue-600 tab:hidden"
            aria-hidden="true"
          />
          <ArrowRightGradient
            className="text-blue-600 h-4 hidden tab:block"
            aria-hidden="true"
          />
        </div>

        {/* Receiver */}
        <div className="tab:col-span-2 flex items-center gap-2 w-full min-w-0 max-w-full">
          <span className="text-muted hidden tab:inline">To</span>
          <Link
            href={`${event.to.chainSlug}/addresses/${event.to.address}`}
            className="px-2 py-1 border border-mid-dark-100 rounded-md flex-1 inline-flex min-w-0"
          >
            <p className="overflow-x-hidden whitespace-nowrap text-ellipsis flex-shrink flex-grow-0 max-w-full">
              {event.to.address}
            </p>
          </Link>
          <span className="text-muted">on</span>
          <Link
            href={`/${event.to.chainSlug}`}
            className="inline-flex items-center gap-1 px-2 py-1 border border-mid-dark-100 rounded-md flex-1 min-w-0"
          >
            <Image
              className="h-4 w-4 flex-none rounded-full"
              alt=""
              width={20}
              height={20}
              src={event.to.chainLogo}
            />
            <p className="overflow-x-hidden whitespace-nowrap text-ellipsis flex-shrink flex-grow-0 max-w-full">
              {event.to.chainName}
            </p>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export function IBCTransferEventCardSkeleton() {
  return (
    <Card className="p-0 grid w-full shadow-none">
      <div className="p-5 rounded-t-lg flex items-start justify-between">
        <Skeleton className="rounded-md h-8 w-24" />
        <Skeleton className="rounded-md h-6 w-24" />
      </div>
      <hr className="h-[1px] bg-mid-dark-100" />

      <div
        className={cn(
          "p-5 rounded-b-lg grid w-full place-content-center text-sm",
          "gap-5",
          "tab:grid-cols-5 tab:gap-2",
        )}
      >
        {/* Sender */}
        <div className="tab:col-span-2 flex items-center gap-2 min-w-0 w-full max-w-full">
          <span className="text-muted">From</span>
          <Skeleton className="rounded-md h-6 flex-1 inline-flex min-w-0" />
          <span className="text-muted">on</span>
          <Skeleton className="rounded-md h-6 flex-1 inline-flex min-w-0" />
        </div>

        {/* Amount */}
        <div
          className={cn(
            "col-span-1 h-full w-full flex items-center justify-center gap-1 py-1",
            "bg-blue-50 border border-blue-100/75 rounded-md tab:border-transparent tab:bg-transparent",
          )}
        >
          <ChevronDoubleDown
            className="h-4 w-4 text-blue-600 tab:hidden flex-none"
            aria-hidden="true"
          />
          <ArrowRightGradient
            className="text-blue-600 h-4 hidden tab:block flex-none"
            aria-hidden="true"
          />
          <Skeleton className="rounded-md w-full h-6" />
          <ChevronDoubleDown
            className="h-4 w-4 text-blue-600 tab:hidden flex-none"
            aria-hidden="true"
          />
          <ArrowRightGradient
            className="text-blue-600 h-4 hidden tab:block flex-none"
            aria-hidden="true"
          />
        </div>

        {/* Receiver */}
        <div className="tab:col-span-2 flex items-center gap-2 min-w-0 w-full max-w-full">
          <span className="text-muted">To</span>
          <Skeleton className="rounded-md h-6 flex-1 inline-flex min-w-0" />
          <span className="text-muted">on</span>
          <Skeleton className="rounded-md h-6 flex-1 inline-flex min-w-0" />
        </div>
      </div>
    </Card>
  );
}
