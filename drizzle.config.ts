import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
	driver: 'pg',
	schema: './src/lib/server/database/schema.ts',
	out: './drizzle',
	dbCredentials: {
		connectionString: process.env.PRIVATE_DATABASE_URL ?? ''
	}
} satisfies Config;
