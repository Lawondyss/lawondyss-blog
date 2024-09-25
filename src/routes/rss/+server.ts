export const prerender = true

import type {RequestHandler} from '@sveltejs/kit'
import {getPosts} from '$data'
import type {Post} from "$types";

export const GET: RequestHandler = async () => {
  const posts: Post[] = await getPosts(10)
  const render = (posts: Post[]): string => `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>https://lawondyss.cz/</id>
  <title>Ladislav "Lawondyss" Vondráček</title>
  <updated>${posts.at(0)?.date ?? '00-00.00'}T:00:00:00CTE</updated>
  <author><name>Ladislav Vondráček</name></author>
  <link href="https://lawondyss.cz/rss" rel="self" type="application/rss+xml" />
  <subtitle>Blog jednoho ajťáka.</subtitle>${posts.map((post: Post) => `
  <entry>
    <id>https://lawondyss.cz${post.url}</id>
    <link href="https://lawondyss.cz${post.url}"/>
    <title><![CDATA[${post.title}]]</title>
    <updated>${post.date}T00:00:00CET</updated>
    <summary><![CDATA[${post.titleImage ? `<img src="${post.titleImage}" height="240" alt=""/>` : ''}<p>${post.perex}</p>]]</summary>
  </entry>`).join('')}
</feed>`

  return new Response(render(posts), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    }
  })
}