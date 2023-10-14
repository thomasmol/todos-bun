import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import 'dotenv/config';

async function main() {
	const migrationClient = postgres(process.env.PRIVATE_DATABASE_URL ?? '', { max: 1 });
	await migrate(drizzle(migrationClient), { migrationsFolder: 'drizzle' });
}

main()
	.catch((err) => {
		console.error(err);
		process.exit(1);
	})
	.then(() => {
		process.exit(0);
	});
