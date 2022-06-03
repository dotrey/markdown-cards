import { Card } from "./Card";

export class CardSet {
    private cards: Card[] = [];
    private _title: string = "";
    private _abstract: string = "";
    private _file: string = "";

    get length(): number {
        return this.cards.length;
    }

    card(index: number): Card {
        return this.cards[index];
    }

    get title(): string {
        return this._title;
    }

    get abstract(): string {
        return this._abstract;
    }

    get file(): string {
        return this._file;
    }
}