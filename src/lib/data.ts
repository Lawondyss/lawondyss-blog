import type {Post} from '$types'
import {postUrl, webalized} from '$utils'
import { marked } from 'marked';

// Redefine File type locally as it's extended with htmlContent
// and the global one is used in other places without this property.
// Alternatively, we could create a new type, e.g. MarkdownFile.
type File = Omit<Post, 'titleImage' | 'url' | 'before' | 'after' | 'htmlContent'> & {
  year: string;
  slug: string;
  htmlContent: string; // Add htmlContent here
};

const markdowns: File[] = []

function getMarkdowns(): File[] {
  if (markdowns.length === 0) {
    const metadataPaths = import.meta.glob('/src/posts/*/*.md', {eager: true})
    const rawContentPaths = import.meta.glob('/src/posts/*/*.md', {as: 'raw', eager: true})

    for (const path in metadataPaths) {
      // @ts-ignore because metadataPaths[path] is import module
      const meta = metadataPaths[path].metadata as Omit<Post, 'titleImage' | 'url' | 'before' | 'after' | 'htmlContent'>
      const rawMarkdownContent = rawContentPaths[path]
      const [year, slug] = path.replace('.md', '').split('/').slice(-2)

      markdowns.push({
        ...meta,
        date: meta.date.substring(0, 10),
        year,
        slug,
        htmlContent: marked(rawMarkdownContent),
      })
    }
  }

  return markdowns
}


const images: Record<string, string> = {}

function getImages(): Record<string, string> {
  if (Object.keys(images).length === 0) {
    const paths = import.meta.glob('/src/posts/*/*.jpg', {eager: true})

    for (const path in paths) {
      const filename = path.split('/').at(-1)
      // @ts-ignore
      images[filename] = paths[path]?.default
    }
  }

  return images
}


async function fileAsPost(file: File): Promise<Post> {
  const imageFile = `${file.slug}-title.jpg`
  const titleImage: string | null = getImages()[imageFile] ?? null

  return {
    titleImage,
    title: file.title,
    perex: file.perex,
    date: file.date,
    tags: file.tags ?? [],
    url: postUrl(file.year, file.slug),
    htmlContent: file.htmlContent, // Map htmlContent
    before: null,
    after: null,
  }
}

function sortByDates(posts: Post[]): Post[] {
  return posts.sort((first: Post, second: Post) =>
    new Date(second.date).getTime() - new Date(first.date).getTime()
  )
}


export async function getPost(year: string, slug: string): Promise<Post | null> {
  const posts: Post[] = await getPosts()

  return posts.filter((p: Post) => p.url === postUrl(year, slug)).at(0) ?? null
}

const posts: Post[] = []

export async function getPosts(count: number | null = null): Promise<Post[]> {
  if (posts.length === 0) {
    const unsorted: Post[] = []
    const files: File[] = getMarkdowns()

    for (const file of files) {
      unsorted.push(await fileAsPost(file))
    }

    const sorted: Post[] = sortByDates(unsorted)
    let lastPost: Post | null = null

    sorted.forEach((post: Post) => {
      if (lastPost) {
        post.after = {url: lastPost.url, label: lastPost.title}
        lastPost.before = {url: post.url, label: post.title}
      }

      lastPost = post
      posts.push(post)
    })
  }

  return count ? posts.slice(0, count) : posts
}


export async function getPostsByYear(year: string, count: number | null = null): Promise<Post[]> {
  return (await getPosts(count)).filter((post: Post) => post.date.startsWith(year))
}


export async function getPostsByUrlTag(urlTag: string, count: number | null = null): Promise<Post[]> {
  const tag: string | null = urlTagAsOrigin(urlTag)

  return (await getPosts(count)).filter((post: Post) => post.tags.includes(tag ?? ''))
}


export function getYears(): string[] {
  const years: Set<string> = new Set

  const files: File[] = getMarkdowns()
  for (const file of files) {
    years.add(file.year)
  }

  return [...years]
}


export function getTags(): { tag: string, count: number }[] {
  const tags: { tag: string, count: number }[] = []
  const counts: Record<string, number> = {}

  const files: File[] = getMarkdowns()
  for (const file of files) {
    file.tags.forEach((t: string) => {
      counts[t] = counts[t] !== undefined ? (counts[t] + 1) : 1
    })
  }

  const sorted = Object.keys(counts).sort()


  for (const tag of sorted) {
    tags.push({tag, count: counts[tag]})
  }

  return tags
}


export function urlTagAsOrigin(urlTag: string): string | null {
  const files: File[] = getMarkdowns()

  for (const file of files) {
    for (const tag of file.tags) {
      if (webalized(tag) === urlTag) return tag
    }
  }

  return null
}
