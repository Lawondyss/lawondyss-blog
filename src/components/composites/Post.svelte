<script lang="ts">
    import type { Link } from '$types'
    import { dateFormat } from '$utils'
    import Tags from '$molecules/Tags.svelte'
    import FooterLinks from '$molecules/FooterLinks.svelte'

    export let title: string
    export let perex: string
    export let date: string
    export let tags: string[]
    export let url: string
    export let before: Link | null
    export let after: Link | null

    console.log(url)
</script>


<article>
    <header>
        <h1>{title}</h1>
        <section class="info">
            <div class="date">{dateFormat(date)}</div>
            <hr>
            <Tags {tags} />
        </section>
    </header>
    <section class="perex">{perex}</section>
    <section class="content"><slot /></section>
    <FooterLinks leftLink={before} rightLink={after} />
</article>

<style>
    article {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        min-height: 100%;
    }

    .info {
        display: flex;
        gap: var(--size-small);
        color: var(--color-darker);
        font-size: .8rem;
        line-height: 125%;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    .info hr {
        display: block;
        width: 1px;
        border: none;
        border-left: 1px solid var(--color-darker);
    }

    .perex {
        font-size: 1.15em;
        font-weight: 300;
    }

    .content {
        flex: 1;
    }
</style>
