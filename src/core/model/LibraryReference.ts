import { CardSet } from "./CardSet";

export class LibraryReference {
    private _cardSet: CardSet | null = null;

    constructor(public name: string, public file: string, public section: string) { }
    
    async cardSet() {

    }
}