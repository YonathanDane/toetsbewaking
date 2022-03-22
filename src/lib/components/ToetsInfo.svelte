<script>
	export let toets;
</script>

<style>
  .toets-info {
    flex: 1;
  }

  .toets-info h6 {
    display: inline-block;
    margin : 0 0 4px 0;
    font-weight: 600;
  }

  .toets-info .duur {
    color: #888;
    font-size: smaller;
    margin-left: 16px;
  }

  .omschrijving {
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
</style>

<div class="toets-info">
  <h6>{ toets.toetscode.toUpperCase() }</h6>
  <span class="duur">{ toets.duur } minuten</span>
  <div class="omschrijving" title={ toets.omschrijving }>{ toets.omschrijving }</div>
</div>