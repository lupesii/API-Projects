import type { FastifyPluginCallback } from "fastify";
import { db } from "src/db/connection";
import { projectsTable } from "src/db/schema/projects";
import { projectsLanguagesTable } from "src/db/schema/projects-languages";
import z from "zod";

const projectSchema = z.object({
	Titulo: z.string(),
	Descricao: z.string(),
	webSiteURL: z.url(),
	githubURL: z.url(),
	status: z.boolean(),
	languages: z.array(z.string()),
});

type project = z.infer<typeof projectSchema>;

export const postProject: FastifyPluginCallback = (app) => {
	app.post(
		"/criaProjeto",
		{
			schema: {
				body: projectSchema,
			},
		},
		async (req, res) => {
			const projectData: project = projectSchema.parse(req.body);

			if (!projectData) res.code(400).send({ Error: "Dados não encontrados" });

			const [InsertProjectData] = await db
				.insert(projectsTable)
				.values({
					title: projectData.Titulo,
					description: projectData.Descricao,
					webSiteURL: projectData.webSiteURL,
					githubURL: projectData.githubURL,
					status: projectData.status,
				})
				.returning();

			await db.insert(projectsLanguagesTable).values(
				projectData.languages.map((language) => {
					return { projectId: InsertProjectData.id, languagesId: language };
				}),
			);
			res.code(200).send({ id: InsertProjectData.id });
		},
	);
};
