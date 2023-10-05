import type { Post, File } from '$types'
import { postUrl, webalized } from '$utils'


async function getFiles(): Promise<File[]> {
    const files = []

    const paths = import.meta.glob('/src/posts/*/*.md', { eager: true })

    for (const path in paths) {
        const file = paths[path]
        const [, , , year, slug] = path.replace('.md', '').split('/')
        const meta = file.metadata as Omit<Post, 'url' | 'before' | 'after'>

        files.push({
            ...meta,
            date: meta.date.substring(0, 10),
            year,
            slug,
        })
    }

    return files
}


function fileAsPost(file: File): Post {
    return {
        title: file.title,
        perex: file.perex,
        date: file.date,
        tags: file.tags,
        url: postUrl(file.year, file.slug),
        before: null,
        after: null,
    }
}


export async function getMeta(year: string, slug: string): Promise<Post | null> {
    const posts: Post[] = await getPosts()

    return posts.filter((p: Post) => p.url === postUrl(year, slug))[0] ?? null
}


export async function getPosts(): Promise<Post[]> {
    const posts: Post[] = []

    const files = await getFiles()

    for (const file of files) {
        posts.push(fileAsPost(file))
    }

    const sorted = posts.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    )

    let lastPost: Post | null = null

    sorted.forEach((post: Post) => {
        if (lastPost) {
            post.after = { url: lastPost.url, label: lastPost.title }
            lastPost.before = { url: post.url, label: post.title }
        }

        lastPost = post
    })

    return sorted
}


export async function getPostsByYear(year: string): Promise<Post[]> {
    const posts: Post[] = []

    const files = await getFiles()
    const forYear = files.filter((f: File) => f.year === year)

    for (const file of forYear) {
        posts.push(fileAsPost(file))
    }

    const sorted = posts.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    )

    let lastPost: Post | null = null

    sorted.forEach((post: Post) => {
        if (lastPost) {
            post.after = { url: lastPost.url, label: lastPost.title }
            lastPost.before = { url: post.url, label: post.title }
        }

        lastPost = post
    })

    return sorted
}


export async function getPostsByUrlTag(urlTag: string): Promise<Post[]> {
    const posts: Post[] = []

    const tag = await urlTagAsOrigin(urlTag)
    const files = await getFiles()
    const forTag = files.filter((f: File) => f.tags.includes(tag ?? ''))

    for (const file of forTag) {
        posts.push(fileAsPost(file))
    }

    const sorted = posts.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    )

    let lastPost: Post | null = null

    sorted.forEach((post: Post) => {
        if (lastPost) {
            post.after = { url: lastPost.url, label: lastPost.title }
            lastPost.before = { url: post.url, label: post.title }
        }

        lastPost = post
    })

    return sorted
}


export async function getYears(): Promise<string[]> {
    const years: Set<string> = new Set

    const files = await getFiles()
    for (const file of files) {
        years.add(file.year)
    }

    return [...years]
}


export async function getTags(): Promise<{ tag: string, count: number }[]> {
    const tags: { tag: string, count: number }[] = []
    const counts: Record<string, number> = {}

    const files = await getFiles()
    for (const file of files) {
        file.tags.forEach((t: string) => {
            counts[t] = counts[t] !== undefined ? (counts[t] + 1) : 1
        })
    }

    const sorted = Object.keys(counts).sort()


    for (const tag of sorted) {
        tags.push({ tag, count: counts[tag] })
    }

    return tags
}


export async function urlTagAsOrigin(urlTag: string): Promise<string | null> {
    const files = await getFiles()

    for (const file of files) {
        for (const tag of file.tags) {
            if (webalized(tag) === urlTag) return tag
        }
    }

    return null
}
