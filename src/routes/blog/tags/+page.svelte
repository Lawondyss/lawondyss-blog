<script lang="ts">
  import type {PageData} from './$types'
  import Tag from '$atoms/Tag.svelte'

  let {data}: { data:PageData } = $props()
</script>

<h1>Tagy</h1>

{#each data.list as item}
  <h3>Článků pro
    <Tag tag={item.tag}/>
    : {item.count}</h3>
{/each}
