import type { ParamMatcher } from '@sveltejs/kit'

export const match: ParamMatcher = (param: string): boolean => {
    return /^\d{1,2}$/.test(param)
}
