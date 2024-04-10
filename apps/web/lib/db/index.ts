import "server-only";
import { localChains } from "./schema/local-chains.sql";
import { drizzle } from "drizzle-orm/pglite";
import { PGlite } from "@electric-sql/pglite";
import { sql } from "drizzle-orm";

const client = new PGlite("./pgdata");
export const db = drizzle(client, {
  schema: {
    localChains,
  },
});
await db.execute(sql`CREATE TABLE IF NOT EXISTS  "local_chains" (
    id SERIAL PRIMARY KEY,
    internalid INTEGER,
    brand TEXT NOT NULL,
    chainname TEXT NOT NULL,
    config JSON NOT NULL,
    paidversion BOOLEAN NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    accountid TEXT NOT NULL,
    integrationid TEXT NOT NULL,
    namespace TEXT,
    daLayer TEXT,
    startheight INTEGER,
    createdtime TIMESTAMP NOT NULL
);
`);
