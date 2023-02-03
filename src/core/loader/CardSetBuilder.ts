import { Card } from "../model/Card";
import { CardSet } from "../model/CardSet";
import { CardSide } from "../model/CardSide";

export class CardSetBuilder {

    private title: string = "";
    setTitle(value: string) {
        this.title = value.trim();
        return this;
    }
    appendTitle(value: string) {
        if (this.title) {
            this.title += "\n";
        }
        this.title += value.trim();
        return this;
    }
    
    private abstract: string = "";
    setAbstract(value: string) {
        this.abstract = value.trim();
        return this;
    }
    appendAbstract(value: string) {
        if (this.abstract) {
            this.abstract += "\n";
        }
        this.abstract += value.trim();
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
        return new CardSet(this.cards, this.title.trim(), this.abstract.trim(), this.file);
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