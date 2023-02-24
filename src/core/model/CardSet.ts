import { MD5 } from 'crypto-js'
import { Card } from './Card'

export class CardSet {
  cards: Card[] = []
  title: string = ''
  abstract: string = ''
  file: string = ''
  id: string = ''

  constructor(cards: Card[], title: string, abstract: string, file: string) {
    this.cards = [...cards]
    this.title = title
    this.abstract = abstract
    this.file = file
    this.id = MD5(this.file).toString()
  }

  get length(): number {
    return this.cards.length
  }

  card(index: number): Card {
    return this.cards[index]
  }
}
