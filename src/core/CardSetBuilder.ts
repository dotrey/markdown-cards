import { Card } from "./Card";
import { CardSet } from "./CardSet";
import { CardSide } from "./CardSide";

export class CardSetBuilder {

    private title: string = "";
    setTitle(value: string) {
        this.title = value;
        return this;
    }
    appendTitle(value: string) {
        this.title += value;
        return this;
    }
    
    private abstract: string = "";
    setAbstract(value: string) {
        this.abstract = value;
        return this;
    }
    appendAbstract(value: string) {
        this.abstract += value;
        return this;
    }
    
    private file: string = "";
    setFile(value: string) {
        this.file = value;
        return this;
    }

    private cards: Card[] = [];
    addCard(card: Card) {
        this.cards.push(card);
        return this;
    }

    build(): CardSet {
        return new CardSet(this.cards, this.title, this.abstract, this.file);
    }

    buildErrorSet(errorMessage: string, file: string) {
        let cards: Card[] = [];
        let errorTitle: string = "An error occurred"
        cards.push(new Card(
            new CardSide(errorTitle, errorTitle, errorTitle, errorMessage, errorMessage, errorMessage),
            new CardSide(errorTitle, errorTitle, errorTitle, errorMessage, errorMessage, errorMessage)
        ));
        return new CardSet(cards, errorTitle, errorMessage, file)
    }

}