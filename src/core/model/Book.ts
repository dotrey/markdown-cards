import { Chapter } from "./Chapter";

export class Book {
    name: string;
    chapters: Chapter[] = [];

    constructor(name: string, chapters: Chapter[]) {
        this.name = name;
        this.chapters = [...chapters];
    }
}