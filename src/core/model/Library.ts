import { Book } from "./Book";

export class Library {
    books: Book[] = [];
    name: string = "";

    constructor(name: string, books: Book[]) {
        this.name = name;
        this.books = [...books];
    }

}