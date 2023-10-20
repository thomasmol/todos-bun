import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

async function main() {
	const sql = postgres(process.env.PRIVATE_DATABASE_URL ?? '', { max: 1 });
	const db = drizzle(sql);
	await migrate(db, { migrationsFolder: './drizzle' });
}

main()
	.catch((err) => {
		console.error(err);
		process.exit(1);
	})
	.then(() => {
		process.exit(0);
	});
