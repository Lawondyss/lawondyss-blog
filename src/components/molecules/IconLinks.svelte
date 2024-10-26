<script lang="ts">
  import IconLink from '$atoms/IconLink.svelte'
</script>

<section>
  <IconLink name="mastodon"/>
  <IconLink name="github"/>
  <IconLink name="pixelfed"/>
  <IconLink name="rss"/>
</section>

<style>
  section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>
