<script lang="ts">
    import type { Post } from '$types'
    import config from '$config'
    import { dateFormat } from '$utils'
    import Tags from '$molecules/Tags.svelte'
    import LinkButton from '$atoms/LinkButton.svelte'

    export let metas: Post[]
</script>

<section>
    {#each metas as meta}
        <article>
            <header>
                <a href={meta.url}>{meta.title}</a>
            </header>
            <section class="info">
                <div class="date">{dateFormat(meta.date)}</div>
                <hr>
                <Tags tags={meta.tags} />
            </section>
            <section class="perex">{meta.perex}</section>
            <footer>
                <LinkButton url={meta.url} label={config.labels.readMore} />
            </footer>
        </article>
    {/each}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: var(--size-large);
    }

    article {
        display: flex;
        flex-direction: column;
        gap: var(--size-small);
    }

    header a {
        text-wrap: balance;
        font-size: 2rem;
        line-height: 2rem;
        color: var(--color);
        text-decoration: none;
        display: block;
    }

    hr {
        display: block;
        width: 1px;
        border: none;
        border-left: 1px solid var(--color-darker);
    }

    .info {
        display: flex;
        flex-direction: row;
        gap: var(--size-small);
        color: var(--color-darker);
        font-size: .8rem;
        line-height: 125%;
        letter-spacing: 1px;
        text-transform: uppercase;
    }
</style>
