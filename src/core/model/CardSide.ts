import { MD5 } from 'crypto-js'

export class CardSide {
  id: string = ''
  html: {
    title: string
    body: string
  }
  text: {
    title: string
    body: string
  }
  raw: {
    title: string
    body: string
  }

  constructor(
    file: string,
    titleRaw: string,
    titleText: string,
    titleHtml: string,
    bodyRaw: string,
    bodyText: string,
    bodyHtml: string
  ) {
    this.html = {
      title: titleHtml,
      body: bodyHtml
    }
    this.text = {
      title: titleText,
      body: bodyText
    }
    this.raw = {
      title: titleRaw,
      body: bodyRaw
    }

    this.id = `${MD5(file)}-${MD5(this.text.title + '|||' + this.text.body)}`
  }
}
