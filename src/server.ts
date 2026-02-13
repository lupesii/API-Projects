import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart";
import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { getEducation } from "./routes/get-education.ts";
import { getExperience } from "./routes/get-experience.ts";
import { getProjectsRoute } from "./routes/get-projects.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>(); //Extende o fastify para utilizar como provedor de tipos o zod
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
	origin: ["https://portifoliolupesi.vercel.app", "http://localhost:5173"],
});

app.register(fastifyMultipart);
app.get("/", (req, res) => {
	res.send({ hello: "world" });
});

app.register(getProjectsRoute);
app.register(getEducation);
app.register(getExperience);

app.listen(
	{ port: Number(process.env.PORT) || 3000, host: "0.0.0.0" },
	(err, address) => {
		if (err) {
			app.log.error(err);
			process.exit(1);
		}
		app.log.info(`server listening on ${address}`);
	},
);
