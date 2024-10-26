<script lang="ts">
  import type {PageData} from './$types'
  import config from '$config'
  import page from '$page'
  import MeIntro from '$composites/MeIntro.svelte'
  import Posts from '$composites/Posts.svelte'
  import LinkButton from '$atoms/LinkButton.svelte'

  let {data}: { data: PageData } = $props()

  page.set()
</script>

<section class="intro">
  <MeIntro>
    <p>Jmenuji se <strong>Ladislav Vondráček</strong>, ale před Ladislavem dávám přednost Láďovi.</p>
    <p>Jsem letitý PHP vývojář s vášní pro vnitropodnikové systémy a klientské aplikace, které stavím s pomocí <a
      href="https://nette.org" target="_blank">Nette</a>.</p>
    <p>Byť je má síla v backendu, umím připravit i vizuálně jednoduchý frontend, kde pro reaktivitu využívám síly <a
      href="http://svelte.dev" target="_blank">Svelte</a>.</p>
  </MeIntro>
</section>

<Posts metas={data.metas}/>

{#if data.hasMore}
  <section class="more">
    <LinkButton url={`${config.routes.blog}/1`} label={config.labels.morePosts} large/>
  </section>
{/if}

<style>
  .intro:has(~ section) {
    margin-bottom: var(--size-l);
  }

  .more {
    display: flex;
    justify-content: center;
    margin-top: var(--size-l);
  }
</style>
