<script>
  import { createEventDispatcher } from 'svelte';
  export let items = [];

  const dispatch = createEventDispatcher();

  function handleDelete(item) {
    dispatch('delete', { id: item.id });
  }

  function handleEdit(item) {
    dispatch('edit', { item });
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
</script>

{#if items.length === 0}
  <p class="empty">No records found. Add your first expense or income!</p>
{:else}
  <div class="expense-list">
    {#each items as item}
      <div class="card {item.type}">
        <div class="left">
          <h3>{item.description}</h3>
          <p class="category">{item.category}</p>
          <p class="date">{formatDate(item.date)}</p>
        </div>

        <div class="right">
          <span class="amount">
            {item.type === 'income' ? '+' : '-'}₹{item.amount.toFixed(2)}
          </span>
          <div class="actions">
            <button class="edit" on:click={() => handleEdit(item)}>✏️</button>
            <button class="delete" on:click={() => handleDelete(item)}>🗑️</button>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .expense-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .card {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 1rem 1.2rem;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
    align-items: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }

  .card.expense {
    border-left: 5px solid #ff5252;
  }

  .card.income {
    border-left: 5px solid #4caf50;
  }

  .left h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
  }

  .category {
    font-size: 0.85rem;
    color: #888;
    margin-top: 0.2rem;
  }

  .date {
    font-size: 0.8rem;
    color: #bbb;
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.4rem;
  }

  .amount {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }

  .card.income .amount {
    color: #4caf50;
  }

  .card.expense .amount {
    color: #ff5252;
  }

  .actions button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: transform 0.2s ease;
  }

  .actions button:hover {
    transform: scale(1.2);
  }

  .actions .edit {
    margin-right: 0.5rem;
    color: #333;
  }

  .actions .delete {
    color: #e53935;
  }

  .empty {
    text-align: center;
    color: #888;
    margin-top: 2rem;
    font-style: italic;
  }
</style>
