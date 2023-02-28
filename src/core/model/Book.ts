import { MD5 } from 'crypto-js';
import type { Chapter } from './Chapter';

export class Book {
  title: string;
  chapters: Chapter[] = [];
  id: string;

  constructor(title: string, chapters: Chapter[]) {
    this.title = title;
    this.id = MD5("book-" + this.title).toString();
    this.chapters = [...chapters];
  }
}
