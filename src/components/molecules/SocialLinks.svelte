<script lang="ts">
  import SocialLink from '$atoms/SocialLink.svelte'
</script>

<section>
  <SocialLink name="mastodon"/>
  <SocialLink name="github"/>
  <SocialLink name="pixelfed"/>
  <SocialLink name="rss"/>
</section>

<style>
  section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>
