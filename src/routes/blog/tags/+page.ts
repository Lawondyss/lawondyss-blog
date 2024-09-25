import type {PageLoad} from './$types'
import {getTags} from '$data'

export const load = (() => {
  return {
    list: getTags(),
  }
}) satisfies PageLoad
