<nav class="navbar">
	<ul class="navbar-list">
		<li class="navbar-item"><a class="navbar-link" href="register">Inschrijven</a></li>
		<li class="navbar-item"><a class="navbar-link" href="registrations">Inschrijvingen</a></li>
		<li class="navbar-item"><a class="navbar-link" href="periodes">Periodes</a></li>
		<li class="navbar-item"><a class="navbar-link" href="toetsen">Toetsen</a></li>
		<li class="navbar-item"><a class="navbar-link" href="#users">Leerlingen</a></li>
	</ul>
</nav>
<slot />

<style>
	.navbar {
		display: block;
		width: 100%;
		height: 5rem;
		z-index: 99;
		border-bottom: 1px solid #ccc;
		margin-bottom: 8px;
	}
	.navbar-list {
		list-style: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.navbar-item {
		position: relative;
		margin-bottom: 0;
	}
	.navbar-link {
		text-transform: uppercase;
		font-size: 1.3rem;
		font-weight: 600;
		letter-spacing: 0.2rem;
		margin-right: 35px;
		text-decoration: none;
		line-height: 5rem;
	}
</style>
