<script lang="ts">
  import type {Post} from '$types'
  import config from '$config'
  import {dateFormat} from '$utils'
  import Tags from '$molecules/Tags.svelte'
  import LinkButton from '$atoms/LinkButton.svelte'
  import Image from "$atoms/Image.svelte";

  type Props = {
    metas: Post[]
  }

  let {metas}: Props = $props()
</script>

<section>
  {#each metas as meta}
    <article>
      <header>
        <a href={meta.url}>
          <h1>{@html meta.title}</h1>
          {#if meta.titleImage}<Image src={meta.titleImage} title={meta.title} crop />{/if}
        </a>
      </header>
      <section class="info">
        <div class="date">{dateFormat(meta.date)}</div>
        <hr>
        <Tags tags={meta.tags}/>
      </section>
      <section class="perex">{meta.perex}</section>
      <footer>
        <LinkButton url={meta.url} label={config.labels.readMore}/>
      </footer>
    </article>
  {/each}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: var(--size-l);

    &.info {
      flex-direction: row;
      gap: var(--size-s);
      color: var(--text-darker);
      font-size: var(--size-xs);
      line-height: 125%;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }

  article {
    display: flex;
    flex-direction: column;
    gap: var(--size-s);
  }

  header a {
    text-wrap: balance;
    font-size: 2rem;
    line-height: 2rem;
    color: var(--text);
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: var(--size-s);
  }

  hr {
    display: block;
    width: 1px;
    border: none;
    border-left: 1px solid var(--text-darker);
  }
</style>
