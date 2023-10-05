<script lang="ts">
    import { page } from '$app/stores'

    export let url: string
    export let label: string
    export let check: string = url

    let current = false

    page.subscribe(({ route }) => {
        current = route.id?.includes(check) ?? false
    })

</script>

<a href={url} class:current>{label}</a>

<style>
    a {
        display: inline-block;
        padding-inline: .25rem;
        color: var(--color-darker);
        font-size: 1.25rem;
        line-height: 1.5rem;
        font-weight: 400;
        letter-spacing: -1px;
        text-decoration: none;
        white-space: nowrap;
        transition: color var(--transition);
    }

    a:hover,
    a.current {
        color: var(--color);
    }
</style>
