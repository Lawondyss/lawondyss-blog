import type {PageLoad} from './$types'
import type {Post} from '$types'
import config from '$config'
import {getPosts} from '$data'
import {hasIndex} from '$utils'

export const load = (async () => {
  const posts = await getPosts(config.posts.homepage + 1)

  const metas: Post[] = posts.slice(0, config.posts.homepage)
  const hasMore: boolean = hasIndex(config.posts.homepage, posts)

  return {
    metas,
    hasMore,
  }
}) satisfies PageLoad
