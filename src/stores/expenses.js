import { writable } from 'svelte/store';

const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

export const expenses = writable(storedExpenses);

// Save to localStorage on change
expenses.subscribe((value) => {
  localStorage.setItem('expenses', JSON.stringify(value));
});
