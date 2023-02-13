import { Book } from "../model/Book";
import { Library } from "../model/Library";

export class LibraryBuilder {

    private name: string = "";
    setName(value: string) {
        this.name = value.trim();
        return this;
    }

    private books: Book[] = [];
    addBook(book: Book) {
        for (let b of this.books) {
            if (b.title === book.title) {
                // There is already a book with the same name
                // -> merge the chapters
                b.chapters = b.chapters.concat(book.chapters);
                return;
            }
        }
        this.books.push(book);
    }

    build(): Library {
        return new Library(this.name, this.books);
    }
}