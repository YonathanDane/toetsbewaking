import { importToetsen } from '$lib/toets';

export async function post({ request }) {
	const body = await request.formData();
	const schooljaarId = await body.get('schooljaar');
  const file = await body.get('importFile');
	const csv = await file.text();

	const data = await importToetsen(schooljaarId, csv);

	return {
		status: 200,
		body: { data }
	};
}
