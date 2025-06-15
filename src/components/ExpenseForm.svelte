<script>
  import { createEventDispatcher } from 'svelte';
  export let editingItem = null;
  const dispatch = createEventDispatcher();

  let description = '';
  let amount = '';
  let category = '';
  let date = '';
  let type = 'expense';

  $: if (editingItem) {
    description = editingItem.description;
    amount = editingItem.amount;
    category = editingItem.category;
    date = editingItem.date;
    type = editingItem.type;
  }

  function handleSubmit() {
    if (!description || !amount || !category || !date) return;

    const newItem = {
      id: crypto.randomUUID(),
      description,
      amount: +amount,
      category,
      date,
      type
    };

    dispatch('add', newItem);

    description = '';
    amount = '';
    category = '';
    date = '';
    type = 'expense';
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h2 style="margin-bottom: 1rem;">
    {editingItem ? 'Edit Entry' : 'Add Expense / Income'}
  </h2>

  <div class="form-grid">
    <input type="text" bind:value={description} placeholder="Description" required />
    <input type="number" bind:value={amount} placeholder="Amount (₹)" required />
    <input type="text" bind:value={category} placeholder="Category" required />
    <input type="date" bind:value={date} required />
    <select bind:value={type}>
      <option value="expense">Expense</option>
      <option value="income">Income</option>
    </select>
  </div>

  <button type="submit" class="submit-btn">
    {editingItem ? 'Update' : 'Add'}
  </button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
  }

  .form-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
    margin-bottom: 1rem;
  }

  input,
  select {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  input:focus,
  select:focus {
    border-color: #4caf50;
    outline: none;
  }

  .submit-btn {
    background-color: #4caf50;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .submit-btn:hover {
    background-color: #43a047;
  }
</style>
