import type { PageLoad, EntryGenerator } from './$types'
import { getYears, getPostsByYear } from '$data'

export const entries: EntryGenerator = async () => {
    const posibilities: { year: string }[] = []
    const years = await getYears()

    for (let year of years) {
        posibilities.push({ year })
    }

    return posibilities
}

export const load = (async ({ params }) => {
    const metas = await getPostsByYear(params.year)

    return {
        metas,
        year: params.year,
    }
}) satisfies PageLoad
