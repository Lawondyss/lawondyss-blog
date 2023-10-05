<script lang="ts">
    import Tag from '$atoms/Tag.svelte'

    export let tags: string[]
</script>


<div>
    {#each tags as tag}
        <Tag {tag} />
    {/each}
</div>

<style>
</style>
