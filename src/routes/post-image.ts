import { v2 as cloudinary } from "cloudinary";
import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "src/db/connection";
import { projectsTable } from "src/db/schema/projects";
import { env } from "src/env";
import z from "zod";

export const postImageRoute: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/image",
		{
			schema: {
				querystring: z.object({
					id: z.string(),
				}),
			},
		},
		async (req, res) => {
			const { id } = req.query;
			const image = await req.file();

			if (!image) {
				return res.code(400).send({ error: "Nenhuma imagem enviada" });
			}

			cloudinary.config({
				cloud_name: "dq331irng",
				api_key: env.API_KEY_CLOUDI,
				api_secret: env.API_SECRET_CLOUD,
			});

			const uploadImage = await new Promise<{ url: string } | undefined>(
				(resolve, reject) => {
					const uploadStream = cloudinary.uploader.upload_stream(
						(error, result) => {
							if (error) return reject({ error });

							return resolve(result);
						},
					);
					image.file.pipe(uploadStream);
				},
			);

			let _url;
			if (uploadImage?.url) {
				_url = uploadImage.url;
			}

			const [updateProject] = await db
				.update(projectsTable)
				.set({ imageURL: _url })
				.where(eq(projectsTable.id, id))
				.returning();

			res.send(updateProject);
		},
	);
};
