import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/db/schema/*.sql.ts",
  out: "./lib/db/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgresql://./pgdata",
    // url: "db.sqlite",
  },
} satisfies Config;
