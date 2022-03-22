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
	let error;
	async function handleSubmit(e) {
		const formData = new FormData(e.target);

    // const data = {};
    // for (let field of formData) {
    //   const [key, value] = field;
    //   data[key] = value;
    // }

		const response = await fetch('/api/import/toetsen', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			error = (await response.json()).message;
			return;
		}
		// window.location = '/toetsen';
	}
</script>



<form on:submit|preventDefault={handleSubmit}>
	<section class="content">
		<aside class="side">
			<div>
				<label for="schooljaar">Schooljaar:</label>
				<select name="schooljaar" id="schooljaar">
				{#each schooljaren as jaar}
					<option value={jaar.id}>
						{jaar.omschrijving}
					</option>
				{/each}
				</select>
			</div>
		</aside>
		<section class="main">
			{#if error}
				<p>{error}</p>
			{/if}
			<div>
				<label for="importFile">Kies toetsen import bestand:</label>
				<input type="file" id="importFile" name="importFile" accept=".txt, .csv" />
			</div>

			<div>
				<input type="submit" value="Importeren" />	
			</div>
		</section>
	</section>
</form>