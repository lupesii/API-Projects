import type { FastifyPluginCallback } from "fastify";
import { db } from "../db/connection.ts";
import { historyTable } from "../db/schema/history.ts";

const Categoria = {
	education: "education",
	experience: "experience",
} as const;

interface HistoryData {
	Titulo: string;
	SubTitulo: string;
	Descricao: string;
	Periodo: string;
	Certificado: string;
	Categoria: keyof typeof Categoria;
}

export const postHistory: FastifyPluginCallback = (app) => {
	app.post("/criaHistory", async (req, res) => {
		let data: HistoryData;
		try {
			const dataJson =
				typeof req.body === "string" ? req.body : JSON.stringify(req.body);
			data = JSON.parse(dataJson);
		} catch (error) {
			console.log(error);
			res.code(400).send({ error: "Invalid JSON format in request body" });
			return;
		}

		console.log(data.Certificado);

		const [HistoryInsert] = await db
			.insert(historyTable)
			.values({
				name: data.Titulo,
				subName: data.SubTitulo,
				description: data.Descricao,
				period: data.Periodo,
				certificate: data.Certificado,
				category: data.Categoria,
			})
			.returning();
		res.code(200).send(HistoryInsert);
	});
};
