<script lang="ts">
  import type {Snippet} from 'svelte'
  import type {Link} from '$types'
  import {dateFormat} from '$utils'
  import Tags from '$molecules/Tags.svelte'
  import FooterLinks from '$molecules/FooterLinks.svelte'
  import Image from "$atoms/Image.svelte";

  type Props = {
    children: Snippet,
    title: string,
    perex: string,
    date: string,
    tags: string[],
    url: string,
    titleImage: string | null,
    before: Link | null,
    after: Link | null,
  }

  let {
    children,
    title,
    perex,
    date,
    tags,
    url,
    titleImage,
    before,
    after,
  }: Props = $props()
  console.log({
    children,
    title,
    perex,
    date,
    tags,
    url,
    titleImage,
    before,
    after,
  })
</script>


<article>
  <header>
    <h1>{@html title}</h1>
    {#if titleImage}<Image src={titleImage} {title} />{/if}
    <section class="info">
      <div class="date">{dateFormat(date)}</div>
      <hr>
      <Tags {tags}/>
    </section>
  </header>
  <section class="perex">{perex}</section>
  <section class="content">{@render children()}</section>
  <FooterLinks leftLink={before} rightLink={after}/>
</article>

<style>
  article {
    display: grid;
    gap: var(--size-l);
    min-height: 100%;
  }

  header {
    display: grid;
    gap: var(--size-m);
  }

  .info {
    display: flex;
    gap: var(--size-s);
    color: var(--text-darker);
    font-size: .8rem;
    line-height: 125%;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .info hr {
    display: block;
    width: 1px;
    border: none;
    border-left: 1px solid var(--text-darker);
  }

  .perex {
    font-size: var(--size-l);
    line-height: 1.2;
  }

  .content {
    flex: 1;
  }
</style>
