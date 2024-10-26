import config from '$config'
import {htmlStrip} from '$utils'


class PageState {
  public isPost: boolean = $state(false)
  public url: string = $state(config.url)
  public title: string = $state(config.title)
  public description: string = $state(config.description)
  public image: string | null = $state(null)

  public set(options: {
               url?: string,
               title?: string,
               description?: string,
               image?: string,
               isPost?: boolean,
             } = {}
  ): void {
    const opts: {
      url: string | null,
      title: string | null,
      description: string | null,
      image: string | null,
      isPost: boolean,
    } = {
      url: null,
      title: null,
      description: null,
      image: null,
      isPost: false,
      ...options,
    }
    this.title = opts.title ? `${config.title} | ${htmlStrip(opts.title)}` : config.title
    this.description = opts.description ? htmlStrip(opts.description) : config.description
    this.url = opts.url ? `${config.url}${opts.url}` : config.url
    this.image = opts.image ? `${config.url}${opts.image}` : `${config.url}${config.image}`
    this.isPost = opts.isPost
  }
}

export default new PageState()