import { PRIVATE_DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const client = postgres(PRIVATE_DATABASE_URL);
const db = drizzle(client, { schema});
 
export default db;