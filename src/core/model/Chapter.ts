import { MD5 } from 'crypto-js';
import type { CardSetLoader } from '../loader/CardSetLoader';
import type { Card } from './Card';
import type { CardSet } from './CardSet';
import { ChapterDetails } from './ChapterDetails';

export class Chapter {
  cardset: CardSet | null = null;
  cards: Card[] = [];
  cardIds: string[] = [];
  cardMapping: { [index: string]: Card } = {};
  id: string;
  details: ChapterDetails;
  isLoaded: boolean = false;

  constructor(public file: string, public title: string, private loader: CardSetLoader) {
    this.id = MD5(file).toString();
    this.details = new ChapterDetails();
  }

  async load(): Promise<void> {
    // Note: when loading, we reset the current values without removing/replacing it.
    // This keeps the reference to the object/array intact.

    this.cardset = await this.loader.load(this.file);
    this.cards.length = 0;
    for (const card of this.cardset.cards) {
      this.cards.push(card);
    }
    for (const key in this.cardMapping) {
      if (this.cardMapping.hasOwnProperty(key)) {
        delete this.cardMapping[key];
      }
    }
    this.cardIds.length = 0;
    this.cards.forEach((card) => {
      this.cardMapping[card.id] = card;
      this.cardIds.push(card.id);
    });
    this.isLoaded = true;
  }
}
