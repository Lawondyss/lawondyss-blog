<script lang="ts">
    import type { PageData } from '../../../../../.svelte-kit/types/src/routes'
    import Posts from '$composites/Posts.svelte'
    import FooterLinks from '$molecules/FooterLinks.svelte'

    export let data: PageData
</script>

<Posts metas={data.metas} />

<FooterLinks leftLink={data.olderLink} rightLink={data.newestLink} tag='section' />
