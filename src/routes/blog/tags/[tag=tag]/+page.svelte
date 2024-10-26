<script lang="ts">
  import type {PageData} from './$types'
  import page from '$page'
  import Posts from '$composites/Posts.svelte'

  let {data}: { data:PageData } = $props()

  page.set({title: `Blog [${data.tag}]`})
</script>

<h1>Články s tagem <strong>{data.tag}</strong></h1>

<Posts metas={data.metas}/>
