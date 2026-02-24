import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
	DATABASE_URL: z.url().startsWith("postgresql://"),
	API_KEY_CLOUDI: z.string(),
	API_SECRET_CLOUD: z.string(),
});

export const env = envSchema.parse(process.env);
