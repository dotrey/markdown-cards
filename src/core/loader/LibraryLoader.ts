import { Library } from "../model/Library";
import { FileLoader } from "./FileLoader";
import { LibraryParser } from "./LibraryParser";

export class LibraryLoader {
    private parser: LibraryParser;

    constructor(private fileLoader: FileLoader) {
        this.parser = new LibraryParser();
    }

    async load(file: string): Promise<Library> {
        try {
            let content = await this.fileLoader.load(file);
            return this.parser.parse(content, file, this.fileLoader);
        } catch (e) {
            return this.buildErrorLibrary((e as Error).message, file)
        }
    }

    private buildErrorLibrary(message: string, file: string) {
        return new Library(`Failed to load ${file} -> ${message}`, [])
    }
}