import { FileLoader } from './loader/FileLoader';
import { LibraryLoader } from './loader/LibraryLoader';
import type { Book } from './model/Book';
import type { Chapter } from './model/Chapter';
import type { Library } from './model/Library';
import { LeitnerSystem } from './storage/LeitnerSystem';
import { PathMerger } from './utility/PathMerger';

export class MarkdownCards {
  private library: Library | null = null;
  private libraryLoader: LibraryLoader;
  private LeitnerSystem: LeitnerSystem;
  bookMap: { [id: string]: Book } = {};
  chapterMap: { [id: string]: Chapter } = {};
  books: Book[] = [];

  constructor(database: string = "MarkdownCards") {
    this.libraryLoader = new LibraryLoader(new FileLoader(), new PathMerger(location.href));
    this.LeitnerSystem = new LeitnerSystem(database);
  }

  async load(): Promise<void> {
    this.library = await this.libraryLoader.load('./index.md');
    for (const key in this.bookMap) {
      if (this.bookMap.hasOwnProperty(key)) {
        delete this.bookMap[key];
      }
    }
    for (const key in this.chapterMap) {
      if (this.chapterMap.hasOwnProperty(key)) {
        delete this.chapterMap[key];
      }
    }
    this.books.length = 0;
    for (const book of this.library.books) {
      this.books.push(book);
      this.bookMap[book.id] = book;
      for (const chapter of book.chapters) {
        this.chapterMap[chapter.id] = chapter;
      }
    }
  }
}
