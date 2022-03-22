import prisma from '$lib/prisma'
import { createSession } from '$lib/sessions';

import { serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
  const body = await request.json();
  const user = await prisma.gebruiker.findUnique({
    where: {
      stamnummer: body.stamnummer,
    },
  })

  if (!user || user.stamnummer !== body.password) {
    return {
      status: 401,
      body: {
        message: 'Incorrect user or password',
      },
    };
  }

  const { id } = await createSession(user);
  return {
    status: 200,
    headers: {
      'Set-Cookie': serialize('session_id', id, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // one week
      }),
    },
    body: {
      message: 'Successfully signed in',
    },
  };
}
