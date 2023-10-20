import { PRIVATE_EMAIL_FROM, PRIVATE_EMAIL_SERVER } from '$env/static/private';
import db from '$lib/server/database/drizzle';
import EmailProvider from '@auth/core/providers/email';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import  type {Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authorization = (async ({ event, resolve }) => {
	const publicRoutes = ['/signin', '/', '/auth/signin/email'];
	const session = await event.locals.getSession();
	/*
	if (publicRoutes.includes(event.url.pathname) && session) {
		throw redirect(303, '/todos');
	}

	if (!publicRoutes.includes(event.url.pathname) && !session) {
		throw redirect(303, '/signin');
	} 

	if (event.url.pathname === '/signin' && session) {
		throw redirect(303, '/todos');
	}*/

	return resolve(event);
}) satisfies Handle;

export const handle = sequence(
	(async ({ event, resolve }) => {
		console.log(event)
		
		return resolve(event);
	}) satisfies Handle,
	SvelteKitAuth({
		debug: true,
		session: {
			strategy: 'database',
			maxAge: 30 * 24 * 60 * 60, // 30 days
			updateAge: 24 * 60 * 60, // 24 hours
			generateSessionToken: () => {
				return crypto.randomUUID();
			}
		},
		adapter: DrizzleAdapter(db),
		providers: [
			EmailProvider({
				server: PRIVATE_EMAIL_SERVER,
				from: PRIVATE_EMAIL_FROM
			})
		]
	}),
	authorization
) satisfies Handle;
