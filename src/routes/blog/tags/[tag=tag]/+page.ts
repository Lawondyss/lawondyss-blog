import type { PageLoad } from './$types'
import { getPostsByUrlTag, urlTagAsOrigin } from '$data'

export const load = (async ({ params }) => {
    return {
        tag: await urlTagAsOrigin(params.tag),
        metas: await getPostsByUrlTag(params.tag),
    }
}) satisfies PageLoad
