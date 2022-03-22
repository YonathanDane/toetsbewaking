<script context="module">
	export async function load({ fetch, session }) {
		if (!session?.user) {
			return {
				status: 302,
				redirect: '/sign-in'
			};
		}
		const registrationsRequest = await fetch(`/api/registration`);
		const { toetsen } = registrationsRequest.ok && (await registrationsRequest.json());

		const schooljarenRequest = await fetch(`/api/schooljaar`);
		const schooljaren = schooljarenRequest.ok && (await schooljarenRequest.json());

		const opleidingenRequest = await fetch(`/api/opleiding`);
		const opleidingen = opleidingenRequest.ok && (await opleidingenRequest.json());

		const users = [];
		toetsen.forEach(t => {
			t.Inschrijving.forEach(i => {
				const { Gebruiker, ...inschrijving } = i;
				let user = users.find(u => u.id === i.gebruikerId);
				if (!user) {
					user = Gebruiker;
					user.aantal = 0;
					users.push(user);
				}
				user.aantal++;
				user[t.toetscode] = inschrijving.type;
			});
		});

		return {
			props: {
				users,
				toetsen,
				schooljaren,
				opleidingen,
			}
		};
	}
</script>

<script>
	export let users;
	export let toetsen;
	export let schooljaren;
	export let opleidingen;
	let schooljaar = schooljaren[0];
	console.log(schooljaren);
	function setSchoolJaar(e) {
		console.log(e);
	}
</script>

<style>
	th, td{
		text-align: center;
	}
	.code {
		writing-mode: vertical-lr;
		padding: 8px;
	}

	label, select {
		display: inline;
	}
</style>
<div>
	<label for="schooljaar">Schooljaar:</label>
	<select name="schooljaar" id="schooljaar" on:change={setSchoolJaar}>
	{#each schooljaren as jaar}
		<option value={jaar.id}>
			{jaar.omschrijving}
		</option>
	{/each}
	</select>

	{#if schooljaar}
	<label for="periode">Periode:</label>
	<select name="periode" id="periode">
	{#each schooljaar.Periodes as periode}
		<option value={periode.periode}>
			{periode.periode}
		</option>
	{/each}
	</select>
	{/if}

	<label for="opleiding">Opleiding:</label>
	<select name="opleiding" id="opleiding">
	{#each opleidingen as opleiding}
		<option value={opleiding.id}>
			{opleiding.id}
		</option>
	{/each}
	</select>
</div>
<div style="margin: 10px;">
	<table>
		<thead>
			<tr>
				<th data-key="id">ID</th>
				<th data-key="achternaam">Leerling</th>
				<th data-key="verlenging">V</th>
				<th data-key="aantal">#</th>
				{#each toetsen as toets (toets.id)}
				<th data-key="{toets.toetscode}" class="code">{toets.toetscode}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each users as user (users.id)}
			<tr>
				<td>{user.stamnummer}</td>
				<td>{user.roepnaam} {user.tussenvoegsel} {user.achternaam}</td>
				<td>x</td>
				<td>{user.aantal}</td>
				{#each toetsen as toets (toets.id)}
				<td>{user[toets.toetscode] || ''}</td>
				{/each}
			</tr>
			{/each}
		</tbody>
	</table>
</div>