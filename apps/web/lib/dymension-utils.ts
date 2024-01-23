import { sql } from "@vercel/postgres";

export async function getDymensionIBCTransfertEvents(): Promise<
  IBCTransferEvent[]
> {
  await sql`CREATE TABLE IF NOT EXISTS "ibc_transfer_events" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR(50) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "amount" VARCHAR(255),
    "from_address" VARCHAR(255) NOT NULL,
    "from_chainname" VARCHAR(255) NOT NULL,
    "from_chainslug" VARCHAR(255) NOT NULL,
    "from_chainlogo" VARCHAR(255) NOT NULL,
    "to_address" VARCHAR(255) NOT NULL,
    "to_chainname" VARCHAR(255) NOT NULL,
    "to_chainslug" VARCHAR(255) NOT NULL,
    "to_chainlogo" VARCHAR(255) NOT NULL
  );`;

  const { rows } =
    await sql<IBCTransferEventRow>`SELECT * FROM "ibc_transfer_events" ORDER BY timestamp DESC LIMIT 5;`;

  return rows.map((row) => ({
    type: "transfer" as const,
    hash: row.hash,
    timestamp: Number(row.timestamp),
    amount: row.amount,
    from: {
      address: row.from_address,
      chainName: row.from_chainname,
      chainSlug: row.from_chainslug,
      chainLogo: row.from_chainlogo,
    },
    to: {
      address: row.to_address,
      chainName: row.to_chainname,
      chainSlug: row.to_chainslug,
      chainLogo: row.to_chainlogo,
    },
  }));
}

type IBCTransferEventRow = {
  id: number;
  type: string;
  hash: string;
  timestamp: string;
  amount: string | null;
  from_address: string;
  from_chainname: string;
  from_chainslug: string;
  from_chainlogo: string;
  to_address: string;
  to_chainname: string;
  to_chainslug: string;
  to_chainlogo: string;
};

export type IBCTransferEvent = {
  type: "transfer";
  hash: string;
  timestamp: number;
  amount?: string | null;
  from: {
    address: string;
    chainName: string;
    chainSlug: string;
    chainLogo: string;
  };
  to: {
    address: string;
    chainName: string;
    chainSlug: string;
    chainLogo: string;
  };
};
