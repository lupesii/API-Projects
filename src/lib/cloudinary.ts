import { v2 as cloudinary } from "cloudinary";
import { env } from "../env.ts";

cloudinary.config({
	cloud_name: "dq331irng",
	api_key: env.API_KEY_CLOUDI,
	api_secret: env.API_SECRET_CLOUD,
});
