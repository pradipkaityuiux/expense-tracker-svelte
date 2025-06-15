<script>
  import { createEventDispatcher } from 'svelte';
  import { expenses } from '../stores/expenses';

  const dispatch = createEventDispatcher();

  // Get unique categories from store
  $: categories = Array.from(new Set($expenses.map(e => e.category)));

  let selected = 'all';

  function handleChange() {
    dispatch('filter', { category: selected });
  }
</script>

<style>
  select {
    padding: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
</style>

<select bind:value={selected} on:change={handleChange}>
  <option value="all">All Categories</option>
  {#each categories as cat}
    <option value={cat}>{cat}</option>
  {/each}
</select>
