<script lang="ts">
  import Tag from '$atoms/Tag.svelte'

  type Props = {
    tags: string[],
  }
  let {tags}: Props = $props()
</script>


<div>
  {#each tags ?? [] as tag}
    <Tag {tag}/>
  {/each}
</div>

<style>
</style>
