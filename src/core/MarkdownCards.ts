import { FileLoader } from "./loader/FileLoader";
import { LibraryLoader } from "./loader/LibraryLoader";
import { Book } from "./model/Book";
import { Chapter } from "./model/Chapter";
import { Library } from "./model/Library";
import { PathMerger } from "./utility/PathMerger";

export class MarkdownCards {
    private library: Library | null = null;
    private libraryLoader: LibraryLoader;
    private chapterMap: { [id: string]: Chapter } = {};

    constructor() {
        this.libraryLoader = new LibraryLoader(
            new FileLoader(),
            new PathMerger(location.href)
        );
    }

    async books(): Promise<Book[]> {
        if (!this.library) {
            await this.loadLibrary();
        }
        return this.library!.books;
    }

    private async loadLibrary(): Promise<void> {
        this.library = await this.libraryLoader.load("./index.md");
        this.chapterMap = {};
        for (const book of this.library.books) {
            for (const chapter of book.chapters) {
                this.chapterMap[chapter.id] = chapter;
            }
        }
    }
}