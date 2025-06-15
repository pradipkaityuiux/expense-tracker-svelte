<script>
  import ExpenseForm from './components/ExpenseForm.svelte';
  import ExpenseList from './components/ExpenseList.svelte';
  import Summary from './components/Summary.svelte';
  import CategoryFilter from './components/CategoryFilter.svelte';
  import CategoryChart from './components/CategoryChart.svelte';
  import Modal from './components/Modal.svelte';
  import { expenses } from './stores/expenses';

  let selectedCategory = 'all';
  let editingItem = null;
  let showModal = false;

  function addExpense(event) {
    const newItem = event.detail;

    if (editingItem) {
      expenses.update(items =>
        items.map(item => item.id === editingItem.id ? { ...newItem, id: editingItem.id } : item)
      );
    } else {
      expenses.update(items => [newItem, ...items]);
    }

    editingItem = null;
    showModal = false;
  }

  function deleteExpense(event) {
    expenses.update(items => items.filter(item => item.id !== event.detail.id));
  }

  function editExpense(event) {
    editingItem = event.detail.item;
    showModal = true;
  }

  function handleCategoryFilter(event) {
    selectedCategory = event.detail.category;
  }

  $: filteredExpenses =
    selectedCategory === 'all'
      ? $expenses
      : $expenses.filter(item => item.category === selectedCategory);
</script>

<main>
  <header>
    <h1>💰 Expense Tracker Dashboard</h1>
    <button on:click={() => { editingItem = null; showModal = true }}>
      Add Expense / Income
    </button>
  </header>

  <div class="dashboard">
    <aside>
      <Summary />
      <CategoryFilter on:filter={handleCategoryFilter} />
      <CategoryChart />
    </aside>

    <section>
      <ExpenseList
        items={filteredExpenses}
        on:delete={deleteExpense}
        on:edit={editExpense}
      />
    </section>
  </div>

  {#if showModal}
    <Modal on:close={() => { showModal = false; editingItem = null }}>
      <ExpenseForm on:add={addExpense} {editingItem} />
    </Modal>
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f9f9fb;
    color: #333;
  }

  main {
    padding: 2rem;
    max-width: 1300px;
    margin: auto;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  header h1 {
    font-size: 1.8rem;
    color: #333;
  }

  header button {
    background-color: #4caf50;
    color: white;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
  }

  header button:hover {
    background-color: #43a047;
  }

  .dashboard {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
  }

  aside {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  section {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.03);
    min-height: 300px;
  }

  @media (max-width: 768px) {
    .dashboard {
      grid-template-columns: 1fr;
    }

    header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    section {
      padding: 1rem;
    }
  }
</style>
