import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "../env.ts";
import { schema } from "./schema/index.ts";

export const sql = neon(env.DATABASE_URL);
export const db = drizzle(sql, {
	schema,
	casing: "snake_case",
});
