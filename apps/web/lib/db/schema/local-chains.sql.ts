import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import type { SingleNetwork } from "~/lib/network";

export const localChains = sqliteTable("local_chains", {
  internalId: text("id").primaryKey(),
  brand: text("brand").notNull(),
  chainName: text("chainName").notNull(),
  config: text("config", { mode: "json" })
    .notNull()
    .$type<SingleNetwork["config"]>(),
  paidVersion: integer("paidVersion", { mode: "boolean" }).notNull(),
  slug: text("slug").notNull().unique(),
  accountId: text("accountId").notNull(),
  integrationId: text("integrationId").notNull(),
  namespace: text("namespace"),
  daLayer: text("daLayer"),
  startHeight: integer("startHeight"),
  createdTime: integer("id", { mode: "timestamp" }).notNull(),
});

export type LocalChain = typeof localChains.$inferSelect;
