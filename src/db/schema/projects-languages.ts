import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { languagesTable } from "./languages.ts";
import { projectsTable } from "./projects.ts";

export const projectsLanguagesTable = pgTable(
	"projects_languages",
	{
		projectId: uuid()
			.references(() => projectsTable.id, { onDelete: "cascade" })
			.notNull(),
		languagesId: uuid()
			.references(() => languagesTable.id, { onDelete: "cascade" })
			.notNull(),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.projectId, table.languagesId] }),
	}),
);
