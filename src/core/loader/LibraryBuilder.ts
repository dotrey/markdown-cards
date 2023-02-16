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
        for (let oldBook of this.books) {
            if (oldBook.title === book.title) {
                // There is already a book with the same name
                // -> merge the chapters, but don't add chapters if there already is one pointing to the same file
                for (const newChapter of book.chapters) {
                    let isDuplicate: boolean = false;
                    for (const chapter of oldBook.chapters) {
                        if (chapter.file === newChapter.file) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        oldBook.chapters.push(newChapter);
                    }
                }
                return;
            }
        }
        this.books.push(book);
    }

    build(): Library {
        return new Library(this.name, this.books);
    }
}