<script lang="ts">
  import config from '$config'
  import Icon from '$atoms/Icon.svelte'

  type Props = {
    name: Name,
  }

  type Name = 'mastodon' | 'github' | 'pixelfed' | 'rss'

  let {name}: Props = $props()

  const socials: Record<Name, string> = {
    mastodon: 'https://mastodonczech.cz/@Lawondyss',
    github: 'https://github.com/lawondyss',
    pixelfed: 'https://pixelfed.cz/Lawondyss',
    rss: config.routes.rss,
  }

  let url = $derived(socials[name])
</script>

<a href={url} target="_blank">
  <Icon {name} height="var(--size-m)" fill="var(--surface)" />
</a>

<style>
  a {
    text-decoration: none;
    display: flex;
    padding: .25rem;
    background-color: var(--text-darker);
    border-radius: .25rem;
  }

  a:hover {
    background-color: var(--text);
  }
</style>
