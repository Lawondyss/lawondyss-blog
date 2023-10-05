<script lang="ts">
    import type { PageData } from './$types'
    import Posts from '$composites/Posts.svelte'

    export let data: PageData
</script>

<h1>Články z roku <strong>{data.year}</strong></h1>
<Posts metas={data.metas} />
