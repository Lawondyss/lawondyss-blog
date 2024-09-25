import type {EntryGenerator, PageLoad} from './$types'
import {getPostsByYear, getYears} from '$data'

export const entries: EntryGenerator = () => {
  const possibilities: { year: string }[] = []
  const years = getYears()

  for (let year of years) {
    possibilities.push({year})
  }

  return possibilities
}

export const load = (async ({params}) => {
  const metas = await getPostsByYear(params.year)

  return {
    metas,
    year: params.year,
  }
}) satisfies PageLoad
