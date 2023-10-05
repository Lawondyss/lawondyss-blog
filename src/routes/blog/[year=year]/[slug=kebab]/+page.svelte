<script lang="ts">
    import type { PageData } from './$types'
    import { afterNavigate } from '$app/navigation'
    import Post from '$composites/Post.svelte'

    export let data: PageData

    let { meta, content } = data
    afterNavigate(() => ( { meta, content } = data ))
</script>

<Post {...meta}>
    <svelte:component this={content} />
</Post>
