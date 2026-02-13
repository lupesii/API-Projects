import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { languagesTable } from "./languages.ts";
import { projectsTable } from "./projects.ts";

export const projectsLanguagesTable = pgTable(
	"projects_languages",
	{
		projectId: uuid()
			.references(() => projectsTable.id)
			.notNull(),
		languagesId: uuid()
			.references(() => languagesTable.id)
			.notNull(),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.projectId, table.languagesId] }),
	}),
);
