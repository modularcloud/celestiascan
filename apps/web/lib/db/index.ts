import "server-only";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
// import { migrate } from "drizzle-orm/better-sqlite3/migrator";
// import { resolve } from "node:path";

const sqlite = new Database("db.sqlite");
export const db = drizzle(sqlite, {
  logger: true,
});

// console.log({
//   dirr: resolve(__dirname, "./drizzle"),
// });
// migrate(db, { migrationsFolder: resolve(__dirname, "./drizzle") });
