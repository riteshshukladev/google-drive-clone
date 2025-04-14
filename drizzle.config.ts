import { type Config } from "drizzle-kit";
import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  tablesFilter: ["drive-tutorial-db_*"],
  dbCredentials: {
    host: process.env.SINGLESTORE_HOST,
    user: process.env.SINGLESTORE_USER,
    password: process.env.SINGLESTORE_PASS,
    port: Number(process.env.SINGLESTORE_PORT) || 3333,
database: "DRIVE_TUTORIAL_DB11",
ssl: {},
},
} satisfies Config;