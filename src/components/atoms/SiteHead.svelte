<script lang="ts">
  import config from '$config'
  import page from '$page'
</script>

<svelte:head>
  <link href={config.routes.rss} type="application/atom+xml" rel="alternate" title="RSS Atom feed" />
  <link rel="me" href={config.links.mastodon}>
  <title>{page.title}</title>
  <meta name="description" content={page.description} />
  <meta property="og:url" content={page.url} />
  <meta property="og:title" content={page.title} />
  <meta property="og:description" content={page.description} />
  <meta property="og:type" content={page.isPost ? 'article' : 'website'} />
  <meta property="og:image" content={page.image} />
</svelte:head>
