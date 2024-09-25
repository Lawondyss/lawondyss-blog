<script lang="ts">
  const toTop = () => scroll({
    top: 0,
    behavior: 'smooth',
  })
</script>

<button onclick={toTop}>↑ nahoru</button>

<style>
  button {
    border: none;
    background-color: transparent;
    padding: var(--space-small);
    font-size: 1.5rem;
    color: var(--text-darker);
    cursor: pointer;
    transition: var(--trans-color)
  }

  button:hover {
    color: var(--text);
  }
</style>
