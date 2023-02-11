import { Card } from "./Card";

export class CardSet {
    cards: Card[] = [];
    title: string = "";
    abstract: string = "";
    file: string = "";

    constructor(cards: Card[], title: string, abstract: string, file: string) {
        this.cards = [...cards];
        this.title = title;
        this.abstract = abstract;
        this.file = file;
    }

    get length(): number {
        return this.cards.length;
    }

    card(index: number): Card {
        return this.cards[index];
    }
}