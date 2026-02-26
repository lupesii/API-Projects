import type { MultipartFile } from "@fastify/multipart";
import type { FastifyPluginCallback } from "fastify";
import { Writable } from "stream";
import { pipeline } from "stream/promises";

export const postProject: FastifyPluginCallback = (app) => {
	app.post("/criaProjeto", async (req, res) => {
		const parts = req.parts();

		let _file: MultipartFile;
		let projectData: JSON | null = null;

		for await (const part of parts) {
			if (part.type === "file") {
				_file = part;
				await pipeline(
					part.file,
					new Writable({
						write(chuck, encoding, callback) {
							callback();
						},
					}),
				);
			}
			if (
				part.fieldname === "project" &&
				"value" in part &&
				typeof part.value === "string"
			) {
				projectData = await JSON.parse(part.value.toString());
			}
		}

		if (projectData) {
			res.code(200).send(projectData);
		} else {
			res.code(400).send({ error: "Project data is missing" });
		}
	});
};
