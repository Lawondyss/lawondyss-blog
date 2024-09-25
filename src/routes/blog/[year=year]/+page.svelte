<script lang="ts">
  import type {PageData} from './$types'
  import Posts from '$composites/Posts.svelte'

  let {data}: { data:PageData } = $props()
</script>

<h1>Články z roku <strong>{data.year}</strong></h1>
<Posts metas={data.metas}/>

<style>
  h1 {
    padding-bottom: var(--size-m);
  }
</style>