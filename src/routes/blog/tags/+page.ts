import type { PageLoad } from './$types'
import { getTags } from '$data'

export const load = (async () => {
    return {
        list: await getTags(),
    }
}) satisfies PageLoad
