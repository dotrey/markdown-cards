import { Book } from '../model/Book';
import { Library } from '../model/Library';
import type { PathMerger } from '../utility/PathMerger';
import type { FileLoader } from './FileLoader';
import { LibraryParser } from './LibraryParser';

export class LibraryLoader {
  private parser: LibraryParser;

  constructor(private fileLoader: FileLoader, private pathMerger: PathMerger) {
    this.parser = new LibraryParser();
  }

  async load(file: string): Promise<Library> {
    try {
      let content = await this.fileLoader.load(file);
      return this.parser.parse(content, this.fileLoader, this.pathMerger);
    } catch (e) {
      return this.buildErrorLibrary((e as Error).message, file);
    }
  }

  private buildErrorLibrary(message: string, file: string) {
    return new Library("Error", [
      new Book(`Error: ${message}`, [])
    ]);
  }
}
