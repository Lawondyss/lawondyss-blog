<script lang="ts">
  import type {PageData} from './$types'
  import Post from '$composites/Post.svelte'

  let {data}: { data: PageData } = $props()
</script>

<Post {...data.meta} children={data.content}/>
