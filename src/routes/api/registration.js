import prisma from '$lib/prisma'

export async function get({ request, params, url }) {
	let yearId = url.searchParams.get('year');
	let periodeId = url.searchParams.get('period');
	let periode;
	if (yearId && periodeId) {
		const schooljaar = await prisma.schooljaar.findUnique({	
			where: { id: yearId } ,
			include: { Periodes: true },
		});
		if (schooljaar) {
			periode = schooljaar.Periodes.find(p => p === periodeId);
		}
	}

	if (!periode) {
		periode = await prisma.periode.findFirst(
			{
				where: {
					inschrijvenVanaf: {
						lte: new Date()
					},
					inschrijvenTm: {
						gte: new Date()
					},
				},
			},
		);
	}

	const toetsen = await prisma.toets.findMany(
		{
			where: {
				opleidingId: request.locals.user.opleidingId,
				periodeId: periode.id,
			},
			include: {
				Inschrijving: {
					include: {
						Gebruiker: true,
					}
				}
			}
		},
	);

	return {
		status: 200,
		body: { toetsen }
	};
}