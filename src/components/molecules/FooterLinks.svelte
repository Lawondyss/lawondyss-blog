<script lang="ts">
	import type { Link } from '$types'
    import LinkButton from '$atoms/LinkButton.svelte'

    export let leftLink: Link | null = null
    export let rightLink: Link | null = null
    export let tag: 'footer' | 'section' = 'footer'
</script>

<svelte:element this={tag} class="links">
    {#if leftLink}
        <LinkButton url={leftLink.url} label={leftLink.label} large />
    {/if}
    <hr class:between={leftLink && rightLink}>
    {#if rightLink}
        <LinkButton url={rightLink.url} label={rightLink.label} large />
    {/if}
</svelte:element>

<style>
    .links {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        margin-top: var(--size-large);
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
        padding: var(--size-small);
    }
</style>
