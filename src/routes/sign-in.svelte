<script>
	import SignInForm from '$lib/components/SignInForm.svelte';

	let error;

	async function handleSubmit({ detail: { stamnummer, password } }) {
		const response = await fetch('/api/sign-in', {
			method: 'POST',
			body: JSON.stringify({ stamnummer, password }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			error = (await response.json()).message;
			return;
		}
		window.location = '/register';
	}
</script>

<div class="content">
  <div class="main">
		<h4>Sign In</h4>
		{#if error}
			<p>{error}</p>
		{/if}
		<SignInForm on:submit={handleSubmit} />
	</div>
</div>
