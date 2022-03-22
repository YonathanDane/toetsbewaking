<script>
	import ToetsInfo from '$lib/components/ToetsInfo.svelte';
	export let toets;
</script>

<style>
	.toets {
		display: flex;
		padding: 4px 0;
		border-top: 1px solid #ddd;
	}

	.toets:first-of-type {
		border-top: 0 none;
	}

	.toets .buttons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.toets .buttons input {
		mask-image: url("trash-can-regular.svg");
		border: none;
		width: 18px;
		height: 20px;
		cursor: pointer;
		color: transparent;
		padding: 0;
		margin: 16px;
		background-color: #000;
	}
</style>

<article class="toets">
	<ToetsInfo toets={toets}></ToetsInfo>
	<div class="buttons">
		{#if toets.inhalen}
		<input class="btn btn-outline-primary" type="submit" name="inschrijving_verwijderen_{ toets.inschrijving.id }" value="Inhalen">
		{/if}
	</div>
</article>

