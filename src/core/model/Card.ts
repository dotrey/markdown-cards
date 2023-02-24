import { CardSide } from './CardSide'

export class Card {
  sides: CardSide[] = []

  constructor(sides: CardSide[]) {
    this.sides = [...sides]
    while (this.sides.length < 2) {
      let text = `Missing Card Side ${this.sides.length}`
      this.sides.push(new CardSide('error.md', text, text, text, text, text, text))
    }
  }

  get id() {
    // The card is always represented by the id of side A
    return this.sides[0].id
  }
}
