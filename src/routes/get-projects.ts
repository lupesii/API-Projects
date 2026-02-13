import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../db/connection.ts";

export const getProjectsRoute: FastifyPluginCallbackZod = (app) => {
	app.get("/projects", async (req, res) => {
		const result = await db.query.projectsTable.findMany({
			with: {
				languages: {
					with: {
						language: true,
					},
				},
			},
		});

		const projects = result.map((p) => ({
			...p,
			languages: p.languages.map((l) => l.language.name),
		}));
		return res.status(200).send(projects);
	});
};
