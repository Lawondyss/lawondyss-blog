import type {PageLoad} from './$types'
import config from '$config'
import {getPosts} from '$data'
import {hasIndex} from '$utils'

export const load = (async () => {
  const url = (page: number): string => `${config.routes.blog}/${page}`

  const start = 0
  const end = config.posts.perPage

  const posts = await getPosts()

  const metas = posts.slice(start, end)
  const olderLink = hasIndex(end, posts)
    ? {url: url(2), label: config.labels.olderPosts}
    : null
  const newestLink = null

  return {
    metas,
    olderLink,
    newestLink,
  }
}) satisfies PageLoad
