import type { PageLoad } from './$types'
import type { Post } from '$types'
import { error } from '@sveltejs/kit'
import { getMeta } from '$data'

export const load = (async ({ params }) => {
    try {
        const meta: Post | null = await getMeta(params.year, params.slug)

        if (!meta) error(404);

        // path must be relative and without "/" in variables
        const content = (await import(`../../../../posts/${params.year}/${params.slug}.md`)).default

        return {
            meta,
            content,
        }
    } catch (err) {
        console.error(err)
        error(404);
    }
}) satisfies PageLoad
