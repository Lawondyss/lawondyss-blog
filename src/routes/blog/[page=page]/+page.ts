import type {PageLoad} from './$types'
import config from '$config'
import {getPosts} from '$data'
import {hasIndex} from '$utils'

export const load = (async ({params}) => {
  const url = (page: number): string => `${config.routes.blog}/${page}`

  const page = +params.page
  const start = config.posts.perPage * (page - 1)
  const end = config.posts.perPage * page

  const posts = await getPosts()

  const metas = posts.slice(start, end)
  const olderLink = hasIndex(end, posts)
    ? {url: url(page + 1), label: config.labels.olderPosts}
    : null
  const newestLink = hasIndex(start - 1, posts)
    ? {url: url(page - 1), label: config.labels.newerPosts}
    : null

  return {
    page,
    metas,
    olderLink,
    newestLink,
  }
}) satisfies PageLoad
