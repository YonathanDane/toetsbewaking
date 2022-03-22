<script>
	import { createEventDispatcher } from 'svelte';

	let stamnummer = '';
	let password = '';

	const dispatch = createEventDispatcher();

	function submit() {
		dispatch('submit', {
			stamnummer,
			password
		});
	}
</script>

<form on:submit|preventDefault={submit}>
	<div>
		<label for="stamnummer">Stamnummer</label>
		<input
		label="Stamnummer"
		id="stamnummer"
		name="stamnummer"
		type="text"
		bind:value={stamnummer}
		required
		/>
	</div>
	<div>
		<label for="password">Wachtwoord</label>
		<input
			label="Password"
			id="password"
			name="password"
			type="password"
			bind:value={password}
			required
		/>
	</div>
	<div>
		<button type="submit">Inloggen</button>
	</div>
</form>
