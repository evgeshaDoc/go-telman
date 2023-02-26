import { resolve } from "path";

import * as dotenv from "dotenv";
import { cleanEnv, str } from "envalid";

try {
	dotenv.config({ path: resolve(process.cwd(), "..", "..", ".env") });
} catch {}

const config = cleanEnv(process.env, {
	POSTGRES_USER: str({ default: "postgres" }),
	POSTGRES_PASSWORD: str({ default: "postgres" }),
	POSTGRES_DB: str({ default: "telman" }),
	POSTGRES_HOST: str({ default: "postgres" }),
	POSTGRES_PORT: str({ default: "5432" }),
	USERS_QUEUE: str({ default: "USERS_QUEUE" }),
	AUTH_QUEUE: str({ default: "AUTH_QUEUE" }),
	KAFKA_BROKERS: str({ default: "kafka:9571" }),
	DOPPLER_TOKEN: str(),
});

export default config;
