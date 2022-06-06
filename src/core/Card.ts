import { CardSide } from "./CardSide";

export class Card {
    private _sideA: CardSide;
    private _sideB: CardSide;
    
    constructor(sideA: CardSide, sideB: CardSide) {
        this._sideA = sideA;
        this._sideB = sideB;
    }

    get sideA(): CardSide {
        return this._sideA;
    }

    get sideB(): CardSide {
        return this._sideB;
    }

}