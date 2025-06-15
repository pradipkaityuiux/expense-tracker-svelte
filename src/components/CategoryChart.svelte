<script>
  import { onMount } from 'svelte';
  import { expenses } from '../stores/expenses';
  import Chart from 'chart.js/auto';

  let chart;
  let canvas;

  // Group by category
  $: categoryData = (() => {
    const map = new Map();

    for (const item of $expenses) {
      const key = item.category;
      const value = item.amount * (item.type === 'expense' ? -1 : 1);
      map.set(key, (map.get(key) || 0) + value);
    }

    return Array.from(map.entries());
  })();

  // Extract labels & values
  $: labels = categoryData.map(([cat]) => cat);
  $: data = categoryData.map(([, val]) => val);

  onMount(() => {
    chart = new Chart(canvas, {
      type: 'bar', // You can switch to 'pie'
      data: {
        labels,
        datasets: [{
          label: 'Net Amount by Category',
          data,
          backgroundColor: [
            '#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4caf50', '#f44336'
          ],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: ctx => `₹${ctx.parsed.y.toFixed(2)}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => chart.destroy();
  });

  // Update chart when data changes
  $: if (chart) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
  }
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    max-width: 100%;
    margin: 1rem 0;
  }
</style>
