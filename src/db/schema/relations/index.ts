import { relations } from "drizzle-orm";
import { languagesTable } from "../languages.ts";
import { projectsTable } from "../projects.ts";
import { projectsLanguagesTable } from "../projects-languages.ts";

export const projectsRelations = relations(projectsTable, ({ many }) => ({
	languages: many(projectsLanguagesTable),
}));

export const languagesRelations = relations(languagesTable, ({ many }) => ({
	projects: many(projectsLanguagesTable),
}));

export const projectsLanguagesRelations = relations(
	projectsLanguagesTable,
	({ one }) => ({
		project: one(projectsTable, {
			fields: [projectsLanguagesTable.projectId],
			references: [projectsTable.id],
		}),
		language: one(languagesTable, {
			fields: [projectsLanguagesTable.languagesId],
			references: [languagesTable.id],
		}),
	}),
);
