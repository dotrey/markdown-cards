import { CardSet } from "./CardSet";

export class Chapter {
    isLoaded: boolean = false;
    file: string = "";
    cardset: CardSet | null = null;

    constructor(file: string) {
        this.file = file;
    }
}