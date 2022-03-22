import { inschrijven } from '$lib/inschrijving';
import prisma from '$lib/prisma'

export async function get({ request, url }) {
	let leerling;
	let leerlingId = url.searchParams.get('leerlingId');
	if (leerlingId) {
		leerling = await prisma.periode.findUnique({ where: { id: leerlingId } });
	} else {
		leerling = request.locals.user;
	}
	const d = new Date();
	d.setDate(d.getDate() - 1);
	const e = new Date();
	e.setDate(e.getDate() + 1);
	const periode = await prisma.periode.findFirst(
		{
			where: {
				inschrijvenVanaf: {
					lte: e
				},
				inschrijvenTm: {
					gte: d
				},
			},
			include: {
				Schooljaar: true,
				Toetsen: {
					where: {
						opleidingId: leerling.opleidingId,
					},
					include: {
						Inschrijving: {
							where: {
								gebruikerId: leerling.id,
							},
						}
					}
				}
			},
		}
	);
	periode.Toetsen = periode.Toetsen.map(t => {
		let { Inschrijving, ...toets } = t;
		if (Inschrijving.length) {
			toets.inschrijving = Inschrijving[0];
		}
		return { ...toets };
	});
	return {
		status: 200,
		body: { periode }
	};
}

export async function post({ request }) {
	let errors = null;
	const data = [...(await request.formData()).keys()];
	if (data.length) {
		errors = await inschrijven(data[0], request.locals.user);
	} else {
		errors = { error: 'Niks te doen' };
	}

	if (errors) {
		// return validation errors
		return {
			status: 400,
			body: { errors }
		};
	}

	// redirect to the newly created item
	return {
		status: 303,
		headers: {
			location: `/register`
		}
	};
}