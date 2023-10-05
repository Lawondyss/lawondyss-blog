<script lang="ts">
    export let url: string
    export let label: string
    export let large: boolean = false

</script>

<a href={url} class:large>{label}</a>

<style>
    a {
        --size: 1rem;
        display: inline-block;
        padding: calc(var(--size) / 2) var(--size);
        border: 1px solid var(--color-darker);
        border-radius: .5rem;
        font-size: var(--size);
        line-height: var(--size);
        color: var(--color-darker);
        text-decoration: none;
        text-wrap: balance;
        text-align: center;
        transition: border var(--transition), color var(--transition);
    }

    a:hover {
        color: var(--color);
        border-color: var(--color);
    }

    .large {
        --size: 1.5rem;
    }
</style>
