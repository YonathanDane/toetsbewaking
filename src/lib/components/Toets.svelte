<script>
	import ToetsInfo from '$lib/components/ToetsInfo.svelte';
	export let toets;
	export let herkansen;
</script>

<style>
	.toets {
		display: flex;
		flex-direction: column;
		padding: 12px 0 0 0;
		margin: 12px 8px;
		border-top: 1px solid #eee;
	}

	.toets:first-of-type {
		border-top: 0 none;
		margin-top: 0;
	}

	.toets .buttons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.toets .buttons input {
		margin: 4px;
	}
</style>

<article class="toets">
	<ToetsInfo toets={toets}></ToetsInfo>
	<div class="buttons">
		{#if toets.herkansen}
		<input class="btn btn-outline-primary" type="submit" name="inschrijving_herkansen_{ toets.id }" value="Herkansen" disabled={herkansen.length || toets.inschrijving}>
		{/if}
		{#if toets.inhalen}
		<input class="btn btn-outline-primary" type="submit" name="inschrijving_inhalen_{ toets.id }" value="Inhalen" disabled={toets.inschrijving}>
		{/if}
	</div>
</article>

