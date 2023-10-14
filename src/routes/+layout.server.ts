import type { Session } from '@auth/core/types';
import type { LayoutServerLoad } from './$types';

export const load = (async (event: {
	locals: { getSession: () => Session | PromiseLike<Session | null> | null };
}) => {
	return {
		session: await event.locals.getSession()
	};
}) satisfies LayoutServerLoad;
