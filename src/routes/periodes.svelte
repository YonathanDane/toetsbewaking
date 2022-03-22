<script context="module">
	export async function load({ fetch, session }) {
		if (!session?.user) {
			return {
				status: 302,
				redirect: '/sign-in'
			};
		}
		const response = await fetch(`/api/schooljaar`);
		const schooljaren = response.ok && (await response.json());
		return {
			status: response.status,
			props: {
				schooljaren,
			}
		};
	}
</script>

<script>
	export let schooljaren;
	let periodes = [];
	let schooljaar = schooljaren[0];
	let error;

	function newSchooljaar() {
		schooljaar = { omschrijving: '' };
		periodes = [];
	}

	function changeSchooljaar(e) {
		const schoolId = parseInt(e.target.value);
		schooljaar = schooljaren.find(s => s.id === schoolId);
		periodes = schooljaar.Periodes;
	}
	async function saveSchooljaar(e) {
		const formData = new FormData(e.target);

		const response = await fetch('/api/schooljaar', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			error = (await response.json()).message;
			return;
		}
	}
</script>



<section class="content">
	<aside class="side">
		<div>
			<label for="schooljaar">Schooljaar:</label>
			<select id="schooljaar" on:change={changeSchooljaar} value={schooljaar.id}>
				{#each schooljaren as jaar}
				<option value={jaar.id}>
					{jaar.omschrijving}
				</option>
				{/each}
			</select>
			<img src="static/pen-solid.svg" alt="Bewerk periode" style="height: 24px" />
			<img src="static/plus-solid.svg" alt="Nieuwe periode" style="height: 24px" on:click={newSchooljaar} />
			<form on:submit|preventDefault={saveSchooljaar}>
				<input type="hidden" name="id" value={schooljaar.id} />
				<label for="omschrijving">Schooljaar:</label>
				<input type="text" id="omschrijving" name="omschrijving" value={schooljaar.omschrijving} />
				<input type="button" value="Annuleren" />
				<input type="submit" value="Opslaan" />
			</form>
		</div>
	</aside>
	<section class="main">
		<table>
			<thead>
				<tr>
					<th data-key="periode">Periode</th>
					<th data-key="vanaf">Inschrijven vanaf</th>
					<th data-key="tm">Inschrijven t/m</th>
				</tr>
			</thead>
			<tbody>
				{#each periodes as periode}
				<tr>
					<td>{periode.periode}</td><td>{new Date(Date.parse(periode.inschrijvenVanaf)).toLocaleString("nl-NL")}</td><td>{new Date(Date.parse(periode.inschrijvenTm)).toLocaleString("nl-NL")}</td>
				</tr>
				{/each}
			</tbody>
	</section>
</section>