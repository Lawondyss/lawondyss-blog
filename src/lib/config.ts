import {base} from '$app/paths'

export default {
  url: 'https://lawondyss.cz',
  posts: {
    homepage: 3,
    perPage: 7,
  },
  labels: {
    readMore: 'Přečíst celé →',
    morePosts: 'Více článků',
    oldesPosts: 'Starší články',
    newestPosts: 'Novější články',
  },
  routes: {
    basePath: base,
    home: `${base}/`,
    about: `${base}/about`,
    contact: `${base}/contact`,
    blog: `${base}/blog`,
    tags: `${base}/blog/tags`,
    rss: `${base}/rss`,
  }
}
