<script>
  import { expenses } from '../stores/expenses';

  // Auto-subscribe to store
  $: totalIncome = $expenses
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  $: totalExpense = $expenses
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  $: balance = totalIncome - totalExpense;
</script>

<style>
  .summary {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    background: #eaf4ff;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  }

  .box {
    flex: 1;
    text-align: center;
    padding: 0.5rem;
    background: #fff;
    border-radius: 6px;
    font-weight: bold;
  }

  .income { color: green; }
  .expense { color: red; }
  .balance { color: #0077ff; }
</style>

<div class="summary">
  <div class="box income">
    Income<br />₹{totalIncome.toFixed(2)}
  </div>
  <div class="box expense">
    Expense<br />₹{totalExpense.toFixed(2)}
  </div>
  <div class="box balance">
    Balance<br />₹{balance.toFixed(2)}
  </div>
</div>
