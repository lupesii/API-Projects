import type { FastifyInstance, FastifyPluginCallback } from "fastify";
import { Resend } from "resend";
import { env } from "src/env";
import z from "zod";

const bodySchema = z.object({
	name: z.string().max(30),
	email: z.email(),
	subject: z.string().max(50),
	message: z.string().max(250),
});

export const postEmail: FastifyPluginCallback = (fastify: FastifyInstance) => {
	fastify.post(
		"/email",
		{ schema: { body: bodySchema } },
		async (request, reply) => {
			const resend = new Resend(env.EMAIL_KEY);
			const body = bodySchema.parse(request.body);

			const { error } = await resend.emails.send({
				from: "contact@resend.dev",
				to: "lucas4162007@gmail.com",
				subject: body.subject,
				html: `<h1>Hi, my name is ${body.name}</h1> </br>  <h2>${body.message}</h2> <h3>Contact-me in my email ${body.email}</h3>`,
			});

			if (error) reply.code(error.statusCode || 500).send(error.message);

			reply.code(200).send({ ok: "Enviado com sucesso" });
		},
	);
};
