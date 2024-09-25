<script lang="ts">
  import type {PageData} from './$types'
  import Posts from '$composites/Posts.svelte'
  import FooterLinks from '$molecules/FooterLinks.svelte'

  let {data}: { data:PageData } = $props()
</script>

<Posts metas={data.metas}/>

<FooterLinks leftLink={data.olderLink} rightLink={data.newestLink} tag='section'/>
