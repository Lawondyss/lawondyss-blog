<script lang="ts">
  import type {Snippet} from 'svelte'
  import '$css/app.css'
  import '$css/code-highlight.css'
  import Page from '$composites/Page.svelte'

  type Props = {
    children: Snippet,
  }

  let {children}: Props = $props()
</script>

<Page>
  {@render children()}
</Page>
