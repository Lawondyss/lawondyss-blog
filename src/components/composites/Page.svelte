<script lang="ts">
    import Navigate from '$molecules/Navigate.svelte'
    import SocialLinks from '$molecules/SocialLinks.svelte'
    import ToTopButton from '$atoms/ToTopButton.svelte'
</script>

<header>
    <a href="/" class="brand">Lawondyss</a>
    <Navigate />
</header>

<main>
    <slot />
</main>

<footer>
    <SocialLinks />
    <ToTopButton />
</footer>

<style>
    header, main, footer {
        width: min(940px, 100%);
        margin-inline: auto;
        padding: var(--size-small);
    }

    header {
        padding-block: var(--size-small);
        margin-bottom: var(--size-normal);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--size-small);
    }

    main {
        flex: 1;
    }

    footer {
        padding-block: var(--size-large);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    @media screen and (min-width: 600px) {
        header {
            flex-direction: row;
            justify-content: space-between;
            align-items: baseline;
            gap: 0;
        }

        footer {
            padding-top: var(--size-large);
        }
    }

    .brand {
        display: block;
        color: var(--color);
        font-family: var(--font-brand);
        font-size: 4rem;
        line-height: 100%;
        font-weight: 700;
        letter-spacing: -3px;
        text-decoration: none;
        -webkit-text-stroke: 1px var(--color-darker);
    }
</style>
