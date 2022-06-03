import { CardSet } from "./CardSet";

export class CardSetLoader {

    load(file: string): CardSet {
        return new CardSet();
    }

}