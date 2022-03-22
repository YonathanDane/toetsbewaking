<script context="module">
	export async function load({ fetch, session }) {
		if (!session?.user) {
			return {
				status: 302,
				redirect: '/sign-in'
			};
		}
		const response = await fetch(`/api/toets`);
		const { periode } = response.ok && (await response.json());
		return {
			status: response.status,
			props: {
				periode,
				user: session.user
			}
		};
	}
</script>

<script>
	import Inschrijving from '$lib/components/Inschrijving.svelte';
	import UserInfo from '$lib/components/UserInfo.svelte';
	import Toets from '$lib/components/Toets.svelte';

	export let periode;
	export let user;
	$: herkansen = periode.Toetsen.filter(x => x.inschrijving && x.inschrijving.type === 'H');
	$: inhalen = periode.Toetsen.filter(x => x.inschrijving && x.inschrijving.type === 'I');

	function getToetsen() {

	}
</script>

<style>
	h5 {
		margin: 16px 0 0;
	}
</style>

<form action="/api/toets" method="post">
	<section class="content">
		<aside class="side">
			<UserInfo {user} />
			{#if herkansen.length}
				<div>
					<h5>Herkansen</h5>
					{#each herkansen as toets (toets.id)}
						<Inschrijving {toets} />
					{/each}
				</div>
			{/if}
			{#if inhalen.length}
				<div>
					<h5>Inhalen</h5>
					{#each inhalen as toets (toets.id)}
						<Inschrijving {toets} />
					{/each}
				</div>
			{/if}
		</aside>
		<section class="main">
			{#each periode.Toetsen as toets (toets.id)}
				<Toets {toets} {herkansen} />
			{/each}
		</section>
	</section>
</form>
