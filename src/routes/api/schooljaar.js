import prisma from '$lib/prisma'

export async function get({ request }) {
	const schooljaar = await prisma.schooljaar.findMany({ include: { Periodes: true } });
  return {
		status: 200,
		body: schooljaar
	};
}

export async function post({ request }) {
	const body = await request.formData();
	let schooljaar;
	try {
		schooljaar = await prisma.schooljaar.create({
			data: {
				omschrijving: await body.get('omschrijving')
			}
		});
	} catch (e) {
		// return validation errors
		return {
			status: 400,
			body: { errors: [ e.message ] }
		};
	}

	return {
		status: 200,
		body: schooljaar
	};
}
