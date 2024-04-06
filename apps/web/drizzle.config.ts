import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/db/schema/*.sql.ts",
  out: "./lib/db/drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "db.sqlite",
  },
} satisfies Config;
