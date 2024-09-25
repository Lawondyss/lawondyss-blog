<script lang="ts">
  import {tagUrl} from '$utils'

  type Props = {
    tag: string,
  }

  let {tag}: Props = $props()

  let href = $derived.by(() => tagUrl(tag))
</script>

<a {href}>{tag}</a>

<style>
  a {
    color: var(--text-darker);
    transition: color var(--transition);
  }

  a:hover {
    color: var(--text);
  }

  a:not(:last-of-type)::after {
    content: ', ';
  }
</style>
