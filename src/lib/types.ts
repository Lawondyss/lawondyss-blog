export type Link = {
  url: string
  label: string
}

export type Post = {
  title: string
  perex: string
  date: string
  tags: string[]
  url: string
  titleImage: string | null
  before: Link | null
  after: Link | null
}

export type File = {
  title: string
  perex: string
  date: string
  tags: string[]
  year: string
  slug: string
}
