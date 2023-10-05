import config from '$config'


export function hasIndex(index: number, haystack: any[]): boolean {
    return haystack[index] !== undefined
}


export function dateFormat(date: string | undefined): string {
    if (!date) return '<error-date>'

    const formatter = Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    // Safari has problem with dashes in the date
    const dateToFormat = new Date(date.replaceAll('-', '/'))

    return formatter.format(dateToFormat)
}


export function webalized(s: string): string {
    const diacritics: Record<string, string> = {
        'á': 'a', 'č': 'c', 'ď': 'd', 'é': 'e', 'ě': 'e', 'í': 'i', 'ň': 'n', 'ó': 'o',
        'ř': 'r', 'š': 's', 'ť': 't', 'ú': 'u', 'ů': 'u', 'ý': 'y', 'ž': 'z', 'Á': 'A',
        'Č': 'C', 'Ď': 'D', 'É': 'E', 'Ě': 'E', 'Í': 'I', 'Ň': 'N', 'Ó': 'O', 'Ř': 'R',
        'Š': 'S', 'Ť': 'T', 'Ú': 'U', 'Ů': 'U', 'Ý': 'Y', 'Ž': 'Z'
    }

    const replaced = s.replace(/[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/g, (match: string) => diacritics[match] || match)
    const parts = replaced.split(' ').filter((p: string) => p !== '')
    const first = parts.shift() ?? ''
    const rest = parts.map((p: string) => `${p.charAt(0).toUpperCase()}${p.slice(1)}`)

    return `${first.toLocaleLowerCase()}${rest}`
}


export function tagUrl(tag: string): string {
    return `${config.routes.tags}/${webalized(tag)}`
}


export function postUrl(year: string, slug: string): string {
    return `${config.routes.blog}/${year}/${slug}`
}
