import { reset } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { historyTable } from "./schema/history.ts";
import { languagesTable } from "./schema/languages.ts";
import { projectsTable } from "./schema/projects.ts";
import { projectsLanguagesTable } from "./schema/projects-languages.ts";

await reset(db, sql);
const [project] = await db
	.insert(projectsTable)
	.values({
		title: "API Rest",
		description: "Uma API simples",
		githubURL: "https://github.com/user/api",
		status: true,
	})
	.returning();

const [language] = await db
	.insert(languagesTable)
	.values({
		name: "Node.js",
	})
	.returning();

await db.insert(projectsLanguagesTable).values({
	projectId: project.id,
	languagesId: language.id,
});

await db.insert(historyTable).values([
	{
		name: "Fatec Prof° Jessen Vidal",
		subName: "Technologist in Multiplatform Software Development",
		description:
			"Pursuing a Technologist Degree in Software Development with a focus on web development and software engineering",
		period: "2025-Present",
		certificate: "https:www.google.com",
		category: "education",
	},
	{
		name: "Self-employed",
		subName: "Freelance Developer",
		description: "Developed custom websites and applications for clients.",
		period: "2022-Present",
		certificate: "https:www.google.com",
		category: "experience",
	},
]);
