import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../db/connection.ts";
import { historyTable } from "../db/schema/history.ts";

export const getExperience: FastifyPluginCallbackZod = (app) => {
	app.get("/experience", async (req, res) => {
		const response = await db
			.select()
			.from(historyTable)
			.where(eq(historyTable.category, "experience"));
		return res.status(200).send(response);
	});
};
