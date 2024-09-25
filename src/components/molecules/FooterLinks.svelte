<script lang="ts">
  import type {Link} from '$types'
  import LinkButton from '$atoms/LinkButton.svelte'

  type Props = {
    leftLink?: Link | null,
    rightLink?: Link | null,
    tag?: 'footer' | 'section',
  }

  let {
    leftLink = null,
    rightLink = null,
    tag = 'footer',
  }: Props = $props()
</script>

<svelte:element class="links" this={tag}>
  {#if leftLink}
    <LinkButton url={leftLink.url} label={leftLink.label} large/>
  {/if}
  <hr class:between={leftLink && rightLink}>
  {#if rightLink}
    <LinkButton url={rightLink.url} label={rightLink.label} large/>
  {/if}
</svelte:element>

<style>
  .links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin-top: var(--size-l);
  }

  @media screen and (min-width: 600px) {
    .links {
      flex-direction: row;
    }
  }

  hr {
    display: block;
    width: 0;
    height: 0;
    border: none;
  }

  hr.between {
    padding: var(--size-s);
  }
</style>
