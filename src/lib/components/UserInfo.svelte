<script>
	import AutoComplete from "simple-svelte-autocomplete"
	import { createEventDispatcher } from 'svelte';

	export let user;

	const dispatch = createEventDispatcher();

	const leerlingen = [
		{ stamnummer: "1234", roepnaam: "Arie", tussenvoegsel: "de", achternaam: "Wild" },
		{ stamnummer: "5577", roepnaam: "Badr", tussenvoegsel: "", achternaam: "Harie" },
	]

	let leerling = leerlingen[0];

	function onChange() {
		dispatch('change', {
			text: 'Hello!'
		});
	}
</script>

<style>
	.user {
		display: flex;
	}
	.avatar {
		background-color: #3485fd;
		border-radius: 50%;
		height: 48px;
		width: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-weight: bold;
	}
	.name {
		font-weight: bold;
		font-size: larger;
	}
	.info {
		padding: 0 16px;
	}
	.sub {
		font-size: smaller;
		color: #777;
		margin-left: 12px;
	}
</style>

<div class="user"> 
	<div class="avatar">{user.voorletters}</div>
	<div class="info">
		<div class="name">
			<AutoComplete items={leerlingen} bind:selectedItem={leerling} labelFunction={s =>
				s.roepnaam + ' ' + s.tussenvoegsel + ' ' + s.achternaam} keywordsFunction={s => s.stamnummer + ' ' + s.roepnaam + ' ' + s.tussenvoegsel + ' ' + s.achternaam} />
		</div>
		<div class="sub">Stamnummer: {user.stamnummer}</div>
	</div>
</div>
