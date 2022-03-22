import prisma from '$lib/prisma'

export async function get({ request }) {
	const opleidingen = await prisma.opleiding.findMany();
  return {
		status: 200,
		body: opleidingen
	};
}
