export const prerender = true

import type {RequestHandler} from '@sveltejs/kit'
import type {Post} from '$types'
import config from '$config'
import {getPosts} from '$data'

export const GET: RequestHandler = async () => {
  const posts: Post[] = await getPosts(10)
  const renderImage = (image: string | null): string => image ? `<img src="${config.url}${image}" height="240" alt=""/>` : ''
  const render = (posts: Post[]): string => `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${config.url}/</id>
  <title>Ladislav "Lawondyss" Vondráček</title>
  <updated>${posts.at(0)?.date ?? '00-00-00'}T:00:00:00Z</updated>
  <author><name>Ladislav Vondráček</name></author>
  <logo>${config.url}/me.jpg</logo>
  <icon>${config.url}/favicon.png</icon>
  <link href="${config.url}${config.routes.rss}" rel="self" type="application/atom+xml" />
  <link href="${config.url}/" rel="alternate" type="text/html" />
  <subtitle>Blog jednoho ajťáka.</subtitle>${posts.map((post: Post) => `
  <entry>
    <id>${config.url}${post.url}</id>
    <title><![CDATA[${post.title}]]</title>
    <updated>${post.date}T00:00:00Z</updated>
    <link rel="alternate" href="${config.url}${post.url}"/>
    <summary><![CDATA[${post.perex}]]</summary>
    <content><![CDATA[${renderImage(post.titleImage)}]]</content>
  </entry>`).join('')}
</feed>`

  return new Response(render(posts), {
    headers: {
      'Cache-Control': 'max-age=604800', // 7 days
      'Content-Type': 'application/atom+xml; charset=utf-8',
    }
  })
}