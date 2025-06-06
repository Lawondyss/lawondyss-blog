export const prerender = true

import type {RequestHandler} from '@sveltejs/kit'
import type {Post} from '$types'
import config from '$config'
import {htmlStrip} from '$utils'
import {getPosts} from '$data'

class Atom {
  private static readonly Header: string = `<?xml version="1.0" encoding="utf-8"?>`

  private posts: Post[]

  private constructor(posts: Post[]) {
    this.posts = posts;
  }

  public static render(posts: Post[]): string {
    const renderer = new Atom(posts)

    return `${renderer.start()}${renderer.attributes()}${renderer.entries()}${renderer.end()}`
  }

  private start(): string {
    return `${Atom.Header}<feed xmlns="http://www.w3.org/2005/Atom">`
  }

  private attributes(): string {
    return `<id>${config.url}/</id>
      <title>Ladislav "Lawondyss" Vondráček</title>
      ${this.updated(this.posts.at(0))}
      <author><name>Ladislav Vondráček</name></author>
      <logo>${config.url}/me.jpg</logo>
      <icon>${config.url}/favicon.png</icon>
      <link href="${config.url}${config.routes.rss}" rel="self" type="application/atom+xml" />
      <link href="${config.url}/" rel="alternate" type="text/html" />
      <subtitle>Blog jednoho ajťáka.</subtitle>`
  }

  private entries(): string {
    return this.posts.map((p) => this.post(p)).join('')
  }

  private end(): string {
    return '</feed>'
  }

  private post(post: Post): string {
    return `<entry>
      ${this.postId(post)}
      ${this.postTitle(post)}
      ${this.postLink(post)}
      ${this.updated(post)}
      ${this.summary(post)}
      ${this.content(post)}
    </entry>`
  }

  private postId(post: Post): string {
    return `<id>${config.url}${post.url}</id>`
  }

  private postTitle(post: Post): string {
    return `<title>${htmlStrip(post.title)}</title>`
  }

  private postLink(post: Post): string {
    return `<link rel="alternate" href="${config.url}${post.url}"/>`
  }

  private updated(post: Post | undefined): string {
    return `<updated>${post?.date ?? '0000-00-00'}T00:00:00Z</updated>`
  }

  private summary(post: Post): string {
    return `<summary type="html"><![CDATA[ ${htmlStrip(post.perex)} ]]></summary>`
  }

  private content(post: Post): string {
    return `<content type="html"><![CDATA[${post.htmlContent}]]></content>`;
  }
}

export const GET: RequestHandler = async () => {
  const posts: Post[] = await getPosts(10)

  return new Response(Atom.render(posts), {
    headers: {
      'Cache-Control': 'max-age=86400', // 1 day
      'Content-Type': 'application/atom+xml; charset=utf-8',
    }
  })
}