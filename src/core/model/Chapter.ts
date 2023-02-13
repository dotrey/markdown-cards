import { MD5 } from "crypto-js";
import { CardSetLoader } from "../loader/CardSetLoader";
import { Card } from "./Card";
import { CardSet } from "./CardSet";

export class Chapter {
    private cardset: CardSet | null = null;
    private _cards: Card[] = [];
    private _cardIds: string[] = [];
    private _cardMapping: { [index: string]: Card } = {};
    id: string;

    constructor(public file: string, public title: string, private loader: CardSetLoader) {
        this.id = MD5(file).toString();
    }

    async cards(): Promise<Card[]> {
        if (!this.cardset) {
            await this.loadCardSet();
        }
        return this._cards;
    }

    async cardIds(): Promise<string[]> {
        if (!this.cardset) {
            await this.loadCardSet();
        }
        return this._cardIds;
    }

    async card(id: string): Promise<Card> {
        if (!this.cardset) {
            await this.loadCardSet();
        }

        return this._cardMapping[id];
    }

    private async loadCardSet(): Promise<void> {
        this.cardset = await this.loader.load(this.file);
        this._cards = [...this.cardset.cards];
        this._cardMapping = {};
        this._cardIds = [];
        this._cards.forEach((card) => {
            this._cardMapping[card.id] = card;
            this._cardIds.push(card.id);
        });
    }

    get isLoaded(): boolean {
        return this.cardset !== null;
    }
}