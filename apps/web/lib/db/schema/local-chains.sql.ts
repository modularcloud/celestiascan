import {
  text,
  integer,
  pgTable,
  serial,
  json,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import type { SingleNetwork } from "~/lib/network";

export const localChains = pgTable("local_chains", {
  id: serial("id").primaryKey(),
  internalId: integer("internalid"),
  brand: text("brand").notNull(),
  chainName: text("chainname").notNull(),
  config: json("config").notNull().$type<SingleNetwork["config"]>(),
  paidVersion: boolean("paidversion").notNull(),
  slug: text("slug").notNull().unique(),
  accountId: text("accountid").notNull(),
  integrationId: text("integrationid").notNull(),
  namespace: text("namespace"),
  daLayer: text("dalayer"),
  startHeight: integer("startheight"),
  createdTime: timestamp("createdtime").notNull(),
});

export type LocalChain = typeof localChains.$inferSelect;
