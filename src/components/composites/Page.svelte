<script lang="ts">
  import type {Snippet} from 'svelte'
  import config from '$config'
  import SiteHead from '$atoms/SiteHead.svelte'
  import Navigate from '$molecules/Navigate.svelte'
  import IconLinks from '$molecules/IconLinks.svelte'
  import ToTopButton from '$atoms/ToTopButton.svelte'

  type Props = {
    children: Snippet,
  }

  let {children}: Props = $props()
</script>

<SiteHead/>

<section>
  <header>
    <a class="brand" href={config.routes.home}>Lawondyss</a>
    <Navigate/>
  </header>

  <main>
    {@render children()}
  </main>

  <footer>
    <IconLinks/>
    <ToTopButton/>
  </footer>
</section>

<style>
  section {
    width: min(940px, 100cqw);
    margin-inline: auto;
    padding: var(--size-l) var(--size-s);
    display: flex;
    flex-direction: column;
    gap: var(--size-xl);
    background-color: var(--background);
  }

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--size-s);


    .brand {
      display: block;
      color: var(--text);
      font-family: var(--font-brand);
      font-size: 4rem;
      line-height: 100%;
      font-weight: 700;
      letter-spacing: -3px;
      text-decoration: none;
      -webkit-text-stroke: 1px var(--text-darker);
    }
  }

  main {
    flex: 1;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }


  @media (width >= 600px) {
    header {
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      gap: 0;
    }
  }
</style>
