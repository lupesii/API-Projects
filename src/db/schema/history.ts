import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const cartegoryEnum = pgEnum("category", ["education", "experience"]);

export const historyTable = pgTable("history", {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 50 }).notNull(),
	subName: varchar({ length: 50 }).notNull(),
	description: varchar().notNull(),
	period: varchar({ length: 15 }).notNull(),
	certificate: varchar().notNull(),
	category: cartegoryEnum("category").notNull(),
});
