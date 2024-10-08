import type {ParamMatcher} from '@sveltejs/kit'

export const match: ParamMatcher = (param: string): boolean => {
  return /^[a-z0-9-]+$/.test(param)
}
