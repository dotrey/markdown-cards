import { FileLoader } from './loader/FileLoader';
import { LibraryLoader } from './loader/LibraryLoader';
import type { Book } from './model/Book';
import type { Chapter } from './model/Chapter';
import type { Library } from './model/Library';
import { BoxStorage } from './storage/BoxStorage';
import { LeitnerSystem } from './storage/LeitnerSystem';
import { PathMerger } from './utility/PathMerger';

export class MarkdownCards {
  private library: Library | null = null;
  private libraryLoader: LibraryLoader;
  private storage: BoxStorage;
  private LeitnerSystem: LeitnerSystem;
  bookMap: { [id: string]: Book } = {};
  chapterMap: { [id: string]: Chapter } = {};
  books: Book[] = [];

  constructor(database: string = "MarkdownCards") {
    this.libraryLoader = new LibraryLoader(new FileLoader(), new PathMerger(location.href));
    this.storage = new BoxStorage(database);
    this.LeitnerSystem = new LeitnerSystem(this.storage);
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
