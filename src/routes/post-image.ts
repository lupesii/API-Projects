import { v2 as cloudinary } from "cloudinary";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { v4 as uuid } from "uuid";
import { env } from "../env.ts";

export const postImageRoute: FastifyPluginCallbackZod = (app) => {
	app.post("/image", async (req, res) => {
		const data = await req.saveRequestFiles();

		if (!data) {
			return res.code(400).send({ error: "Nenhuma imagem enviada" });
		}

		cloudinary.config({
			cloud_name: "dq331irng",
			api_key: env.API_KEY_CLOUDI,
			api_secret: env.API_SECRET_CLOUD,
		});

		const fileName = data[0].filename + uuid();

		const uploadResult = await cloudinary.uploader
			.upload(data[0].filepath, {
				public_id: fileName,
			})
			.catch((error) => {
				res.code(500).send(error);
			});

		if (uploadResult && uploadResult.public_id) {
			console.log(uploadResult.public_id);
			const url = cloudinary.url(fileName, {
				transformation: [
					{
						quality: "auto",

						fetch_format: "auto",
					},
				],
			});
			res.code(201).send(url);
		}
	});
};
