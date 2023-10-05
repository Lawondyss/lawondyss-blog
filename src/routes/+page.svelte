<script lang="ts">
	import type { PageData } from './$types'
    import config from '$config'
    import MeIntro from '$composites/MeIntro.svelte'
    import Posts from '$composites/Posts.svelte'
    import LinkButton from '$atoms/LinkButton.svelte'

    export let data: PageData
</script>

<section class="intro">
    <MeIntro>
        <p>Jmenuji se <strong>Ladislav Vondráček</strong>, ale před Ladislavem dávám přednost Láďovi.</p>
        <p>Jsem letitý PHP vývojář s vášní pro vnitropodnikové systémy a klientské aplikace, které stavím s pomocí <a href="https://nette.org" target="_blank">Nette</a>.</p>
        <p>Byť je má síla v backendu, hledám si cestu i na frontend, kde pro reaktivitu využívám síly <a href="http://svelte.dev" target="_blank">Svelte</a>.</p>
        <p>Tenhle blog mi slouží hlavně jako poznámkovník, kam si zapisuji řešení různých problémů, nebo zajímavé objevy.</p>
    </MeIntro>
</section>

<Posts metas={data.metas} />

{#if data.hasMore}
    <section class="more">
        <LinkButton url={`${config.routes.blog}/1`} label={config.labels.morePosts} large />
    </section>
{/if}

<style>
    .intro:has(~ section) {
        margin-bottom: var(--size-large);
    }

    .more {
        display: flex;
        justify-content: center;
        margin-top: var(--size-large);
    }
</style>
