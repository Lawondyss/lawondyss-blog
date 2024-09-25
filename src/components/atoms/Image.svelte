<script lang="ts">
  type Props = {
    src: string,
    title?: string | null,
    description?: string | null,
    crop?: boolean,
  }

  let {
    src,
    title = null,
    description = null,
    crop = false,
  }: Props = $props()

  let alt = $derived(title ?? description)
</script>

<figure class:crop>
  <img {src} {alt} loading="lazy" decoding="async"/>
  {#if description}
    <figcaption>{description}</figcaption>
  {/if}
</figure>

<style>
  figure {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--size-s);
    width: 100%;
    overflow: hidden;
    border-radius: var(--size-s);

    &::before {
      content: 'načítám...';
      position: absolute;
      inset: 0;
      z-index: 1;
      display: grid;
      place-items: center;
      background-color: oklch(from var(--background) calc(l + .1) c h);
      color: var(--text-darker);
      font-size: 2rem;
      font-weight: bold;
    }

    &.crop {
      height: min(250px, 40cqw);
      aspect-ratio: 18 / 6;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 2;
    }

    figcaption {
      font-size: var(--text-small);
      text-align: center;
      margin-top: 0.85rem;
      color: var(--color-text-shade);
    }
  }


</style>
