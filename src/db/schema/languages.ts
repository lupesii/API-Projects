import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const languagesTable = pgTable("languages", {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 100 }).notNull(),
});
