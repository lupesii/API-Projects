import { languagesTable } from "./languages.ts";
import { projectsTable } from "./projects.ts";
import { projectsLanguagesTable } from "./projects-languages.ts";
import {
	languagesRelations,
	projectsLanguagesRelations,
	projectsRelations,
} from "./relations/index.ts";

export const schema = {
	projectsTable,
	projectsLanguagesTable,
	languagesTable,
	projectsRelations,
	languagesRelations,
	projectsLanguagesRelations,
};
