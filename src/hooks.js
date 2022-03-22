
import { parse } from 'cookie';
import { getSession as getSessionFromSessions } from '$lib/sessions'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const cookies = parse(event.request.headers.get('cookie') || '');
  if (!event.request.locals) {
    event.request.locals = {};
  }

  if (cookies.session_id) {
    const session = await getSessionFromSessions(cookies.session_id);
    if (session) {
      event.request.locals.user = session.user;
      return resolve(event);
    }
  }

  event.request.locals.user = null;
  return resolve(event);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
  return event?.request?.locals?.user
    ? { user: event.request.locals.user }
    : {};
}
