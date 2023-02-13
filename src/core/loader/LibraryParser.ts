import { Library } from "../model/Library";
import { PathMerger } from "../utility/PathMerger";
import { BookBuilder } from "./BookBuilder";
import { CardSetLoader } from "./CardSetLoader";
import { FileLoader } from "./FileLoader";
import { LibraryBuilder } from "./LibraryBuilder";

export class LibraryParser {

    parse(source: string, fileLoader: FileLoader, pathMerger: PathMerger): Library {
        let libraryBuilder: LibraryBuilder = new LibraryBuilder();
        let bookBuilder: BookBuilder = new BookBuilder(new CardSetLoader(fileLoader), pathMerger);

        let state: number = 0;

        for (const line of source.split("\n")) {            
            if (!line) {
                // skip empty lines
                continue;
            }

            let startSymbol: string = line.substring(0, line.indexOf(" "));
            switch (startSymbol) {
                case "#":
                    if (state === 0) {
                        libraryBuilder.setName(line.substring(2));
                        state = 1;
                    }
                    break;
                
                case "##":
                    state = 2;
                    this.tryBuildBook(bookBuilder, libraryBuilder);

                    bookBuilder.setTitle(line.substring(3));
                    break;
                
                default:
                    if (state === 2) {
                        bookBuilder.appendContent(line);
                    }
            }
        }


        this.tryBuildBook(bookBuilder, libraryBuilder);

        return libraryBuilder.build();
    }

    private tryBuildBook(bookBuilder: BookBuilder, libraryBuilder: LibraryBuilder) {
        if (bookBuilder.hasContent()) {
            libraryBuilder.addBook(bookBuilder.build());
        }
        bookBuilder.reset();
    }
}