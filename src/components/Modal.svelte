<script>
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }
</script>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s ease-in-out;
    z-index: 1000;
  }

  .modal {
    background: #fff;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
    position: relative;
    animation: scaleUp 0.3s ease-in-out;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.2rem;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #666;
  }

  @keyframes fadeIn {
    from { opacity: 0 }
    to { opacity: 1 }
  }

  @keyframes scaleUp {
    from { transform: scale(0.9); opacity: 0 }
    to { transform: scale(1); opacity: 1 }
  }
</style>

<div class="overlay" on:click={close}>
  <div class="modal" on:click|stopPropagation>
    <button class="close-btn" on:click={close}>✕</button>
    <slot />
  </div>
</div>
