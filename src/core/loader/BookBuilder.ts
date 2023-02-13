import { Book } from "../model/Book";
import { Chapter } from "../model/Chapter";
import { PathMerger } from "../utility/PathMerger";
import { CardSetLoader } from "./CardSetLoader";

export class BookBuilder {
    constructor(private cardSetLoader: CardSetLoader, private pathMerger: PathMerger) {
        
    }

    private _hasContent: boolean = false;
    hasContent() {
        return this._hasContent;
    }

    private title: string = "";
    setTitle(value: string) {
        this.title = value.trim();
        this._hasContent = true;
        return this;
    }

    private content: string = "";
    appendContent(value: string) {
        if (this.content) {
            this.content += " ";
        }
        this.content += value.trim();
        this._hasContent = true;
        return this;
    }

    build(): Book {
        let chapters: Chapter[] = [];
        // Not sure why this won't work
        // [...this.content.matchAll(/\[([^]+?)]\(([^)]+?)\)/g)].forEach((match) => {
        //     chapters.push(new Chapter(this.mergePath(match[2]), match[1], this.cardSetLoader));
        // });
        this.content.match(/\[([^]+?)]\(([^)]+?)\)/g)?.forEach((match) => {
            const parts: string[] = match.split("](");
            if (parts.length === 2) {
                chapters.push(new Chapter(
                    this.pathMerger.merge(parts[1].substring(0, parts[1].length - 1)),
                    parts[0].substring(1),
                    this.cardSetLoader
                ));
            }
        });

        return new Book(this.title, chapters);
    }

    reset() {
        this.title = "";
        this.content = "";
        this._hasContent = false;
    }
}