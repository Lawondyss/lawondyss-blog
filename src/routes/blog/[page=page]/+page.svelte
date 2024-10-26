<script lang="ts">
  import type {PageData} from './$types'
  import page from '$page'
  import Posts from '$composites/Posts.svelte'
  import FooterLinks from '$molecules/FooterLinks.svelte'

  let {data}: { data:PageData } = $props()

  page.set({title: 'Blog'})
</script>

<Posts metas={data.metas}/>

<FooterLinks leftLink={data.olderLink} rightLink={data.newestLink} tag='section'/>
