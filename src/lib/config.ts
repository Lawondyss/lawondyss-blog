import {base} from '$app/paths'

export default {
  url: 'https://lawondyss.cz',
  title: 'Lawondyss',
  description: 'Ladislav Vondráček, webdeveloper k vašim službám',
  image: '/logo.png',
  links: {
    mastodon: 'https://mastodonczech.cz/@Lawondyss',
    github: 'https://github.com/lawondyss',
    pixelfed: 'https://pixelfed.cz/Lawondyss',
  },
  posts: {
    homepage: 3,
    perPage: 7,
  },
  labels: {
    readMore: 'Přečíst celé →',
    morePosts: 'Více článků',
    olderPosts: 'Starší články',
    newerPosts: 'Novější články',
  },
  routes: {
    basePath: base,
    home: `${base}/`,
    about: `${base}/about`,
    contact: `${base}/contact`,
    blog: `${base}/blog`,
    tags: `${base}/blog/tags`,
    rss: `${base}/rss.xml`,
  }
}
