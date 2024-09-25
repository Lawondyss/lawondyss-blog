<script lang="ts">
  import type {Snippet} from 'svelte'
  import config from '$config'

  type Props = {
    children: Snippet,
  }

  let {children}: Props = $props()
</script>

<img alt="Láďa Vondráček" src={`${config.routes.basePath}/me.jpg`}/>

{@render children()}

<style>
  img {
    display: block;
    width: max(20%, 120px);
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid var(--text-darker);
    margin: 0 auto 2rem auto;
  }

  @media screen and (min-width: 600px) {
    img {
      float: left;
      margin: 0 2rem 1rem 0;
    }
  }
</style>
