import { CardSide } from "./CardSide";

export class Card {

    sideA(): CardSide {
        return new CardSide();
    }

    sideB(): CardSide {
        return new CardSide();
    }

}