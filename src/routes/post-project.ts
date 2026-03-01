import type { FastifyPluginCallback } from "fastify";
import { db } from "src/db/connection";
import { projectsTable } from "src/db/schema/projects";
import z from "zod";

const projectSchema = z.object({
	Titulo: z.string(),
	Descricao: z.string(),
	webSiteURL: z.url(),
	githubURL: z.url(),
	status: z.boolean(),
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
			res.code(200).send(InsertProjectData);
		},
	);
};
