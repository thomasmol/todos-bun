import { timestamp, pgTable, text, primaryKey, integer, uuid } from 'drizzle-orm/pg-core';
import type { AdapterAccount } from '@auth/core/adapters';

export const users = pgTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	firstName: text('firstName'),
	lastName: text('lastName'),
	email: text('email').notNull(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow()
});

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	(account) => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId)
	})
);

export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull()
});

export const verificationTokens = pgTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	(vt) => ({
		compoundKey: primaryKey(vt.identifier, vt.token)
	})
);

export const todos = pgTable(
	'todos',{
		id: uuid('id').notNull().primaryKey().defaultRandom(),
		title: text('title').notNull(),
		description: text('description').notNull(),
		status: text('status').notNull(),
		userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
		updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow()
	}
)