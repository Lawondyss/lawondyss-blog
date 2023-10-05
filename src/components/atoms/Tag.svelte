<script lang="ts">
    import { tagUrl } from '$utils'

    export let tag: string

    $: href = tagUrl(tag)
</script>

<a {href} >{tag}</a>

<style>
    a {
        color: var(--color-darker);
        transition: color var(--transition);
    }

    a:hover {
        color: var(--color);
    }

    a:not(:last-of-type)::after {
        content: ', ';
    }
</style>
