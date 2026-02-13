import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const projectsTable = pgTable("projects", {
	id: uuid().primaryKey().defaultRandom(),
	title: varchar({ length: 100 }).notNull(),
	description: varchar().notNull(),
	webSiteURL: varchar(),
	githubURL: varchar().notNull(),
	status: boolean().notNull(),
});
