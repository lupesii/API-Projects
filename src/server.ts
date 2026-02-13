import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart";
import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import z4 from "zod/v4";
import { getEducation } from "./routes/get-education.ts";
import { getExperience } from "./routes/get-experience.ts";
import { getProjectsRoute } from "./routes/get-projects.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>(); //Extende o fastify para utilizar como provedor de tipos o zod
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
	origin: "*",
});

app.register(fastifyMultipart);
app.get("/", async (req, res) => {
	res.send({ hello: "world" });
});

app.register(getProjectsRoute);
app.register(getEducation);
app.register(getExperience);

const start = async () => {
	try {
		const PORT = Number(process.env.PORT) || 3000;

		await app.listen({
			port: PORT,
			host: "0.0.0.0",
		});

		console.log("Server running at PORT: " + PORT);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
