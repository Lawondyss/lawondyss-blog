<script lang="ts">
  import type {PageData} from './$types'
  import Posts from '$composites/Posts.svelte'

  let {data}: { data:PageData } = $props()
</script>

<h1>Články s tagem <strong>{data.tag}</strong></h1>

<Posts metas={data.metas}/>
