<script lang="ts">
  import type {Snippet} from 'svelte'
  import {onNavigate} from '$app/navigation'
  import '$css/app.css'
  import '$css/code-highlight.css'
  import Page from '$composites/Page.svelte'

  type Props = {
    children: Snippet,
  }

  let {children}: Props = $props()


  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })
</script>

<Page>
  {@render children()}
</Page>
