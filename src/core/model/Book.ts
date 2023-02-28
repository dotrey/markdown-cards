import type { Chapter } from './Chapter';

export class Book {
  title: string;
  chapters: Chapter[] = [];

  constructor(title: string, chapters: Chapter[]) {
    this.title = title;
    this.chapters = [...chapters];
  }
}
