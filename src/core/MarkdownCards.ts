import { FileLoader } from './loader/FileLoader';
import { LibraryLoader } from './loader/LibraryLoader';
import type { Book } from './model/Book';
import type { Chapter } from './model/Chapter';
import type { Library } from './model/Library';
import { PathMerger } from './utility/PathMerger';

export class MarkdownCards {
  private library: Library | null = null;
  private libraryLoader: LibraryLoader;
  private chapterMap: { [id: string]: Chapter } = {};
  books: Book[] = [];

  constructor() {
    this.libraryLoader = new LibraryLoader(new FileLoader(), new PathMerger(location.href));
  }

  async load(): Promise<void> {
    this.library = await this.libraryLoader.load('./index.md');
    this.chapterMap = {};
    this.books.length = 0;
    for (const book of this.library.books) {
      this.books.push(book);
      for (const chapter of book.chapters) {
        this.chapterMap[chapter.id] = chapter;
      }
    }
  }
}
