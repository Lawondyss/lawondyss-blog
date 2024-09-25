<script lang="ts">
  type Props = {
    url: string,
    label: string,
    large?: boolean | undefined,
  }

  let {
    url,
    label,
    large = false,
  }: Props = $props()

</script>

<a class:large href={url}>{@html label}</a>

<style>
  a {
    --size: 1rem;
    display: inline-block;
    padding: calc(var(--size) / 2) var(--size);
    border: 1px solid var(--text-darker);
    border-radius: .5rem;
    font-size: var(--size);
    line-height: var(--size);
    color: var(--text-darker);
    text-decoration: none;
    text-wrap: balance;
    text-align: center;
    transition: border var(--transition), color var(--transition);
  }

  a:hover {
    color: var(--text);
    border-color: var(--text);
  }

  .large {
    --size: 1.5rem;
  }
</style>
