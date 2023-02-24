import { Card } from '../model/Card'
import { CardSet } from '../model/CardSet'
import { CardSide } from '../model/CardSide'
import { CardSetBuilder } from './CardSetBuilder'
import { CardSideBuilder } from './CardSideBuilder'

/**
 * MDC uses only a subset of the available Markdown syntax and especially only allows
 * for headings as block elements. All other blocks, like "```" code or ">" blockquotes
 * are ignored. Their keywords remain unchanged.
 *
 * Only inline syntax for text formatting is supported, sth. like a link or image won't
 * work either and will remain unchangend.
 */
export class CardSetParser {
  parse(source: string, file: string = ''): CardSet {
    let setBuilder: CardSetBuilder = new CardSetBuilder(file)
    let sideBuilder: CardSideBuilder = new CardSideBuilder(file)
    let sides: CardSide[] = []
    let state: number = 0

    for (const line of source.split('\n')) {
      if (!line) {
        // skip empty lines
        continue
      }

      let startSymbol: string = line.substring(0, line.indexOf(' '))
      switch (startSymbol) {
        case '#':
          if (state === 0) {
            // Level 1 heading, only allowed at the begining of the document, all further appearances will
            // be treated like a normal text line
            setBuilder.setTitle(line.substring(2))
            state = 1
          } else if (state > 1) {
            // Only append if state indicates we are building a card side
            sideBuilder.appendBody(line)
          }
          break

        case '##':
          // Level 2 heading, start with a new side A
          state = 2
          this.tryBuildCard(sides, sideBuilder, setBuilder)

          sideBuilder.setTitle(line.substring(3))
          break

        case '###':
          // Level 3 heading, create a side B
          state = 3
          if (sideBuilder.hasContent()) {
            sides.push(sideBuilder.build())
          } else {
            // If the SideBuilder has no content yet, there was no level 2 heading before
            // -> this is a dangling level 3 heading that can be ignored
            break
          }

          sideBuilder = new CardSideBuilder(file)
          sideBuilder.setTitle(line.substring(4))
          break

        default:
          if (state === 1) {
            // Append to set abstract
            setBuilder.appendAbstract(line)
          } else if (sideBuilder.hasContent()) {
            // Append to side body, but only if we already have some content for the side (at least a title)
            sideBuilder.appendBody(line)
          }
          break
      }
    }

    this.tryBuildCard(sides, sideBuilder, setBuilder)
    return setBuilder.build()
  }

  private tryBuildCard(
    sides: CardSide[],
    sideBuilder: CardSideBuilder,
    setBuilder: CardSetBuilder
  ) {
    if (sideBuilder.hasContent()) {
      sides.push(sideBuilder.build())
    }
    sideBuilder.reset()
    if (sides.length > 0) {
      if (sides.length < 2) {
        // We have one side for a card, but are missing a second one
        // -> add a second empty side
        sides.push(sideBuilder.build())
      }

      // Add the card with the previously collected sides to the set
      setBuilder.addCard(new Card(sides))
      sides.length = 0
    }
  }
}
