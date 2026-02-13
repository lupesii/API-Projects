import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../db/connection.ts";
import { historyTable } from "../db/schema/history.ts";

export const getEducation: FastifyPluginCallbackZod = (app) => {
	app.get("/education", async (req, res) => {
		const result = await db
			.select()
			.from(historyTable)
			.where(eq(historyTable.category, "education"));
		return res.status(200).send(result);
	});
};
