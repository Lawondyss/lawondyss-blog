<script lang="ts">
    import SocialLink, { names } from '$atoms/SocialLink.svelte'
</script>

<section>
    {#each names as name}
        <SocialLink {name} />
    {/each}
</section>

<style>
    section {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
</style>
