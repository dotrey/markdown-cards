import type { BoxDatabase } from "./BoxDatabase";
import { StorageCard } from "./model/StorageCard";
import { StorageChapter } from "./model/StorageChapter";
import { StorageQuizSet } from "./model/StorageQuizSet";
import { openDB, type IDBPDatabase } from "idb/with-async-ittr";

export class BoxStorage {

    private db: IDBPDatabase<BoxDatabase>|null = null;
    private dbVersion: number = 1;

    constructor(database: string) {
        this.connect(database);
    }

    async getCard(id: string): Promise<StorageCard> {
        return await this.db?.get("cards", id) || new StorageCard(id);
    }

    async storeCard(card: StorageCard) {
        return await this.db?.put("cards", card, card.id);
    }

    async getCardsByBox(box: number): Promise<StorageCard[]> {
        box = Math.min(5, Math.max(0, box));
        return this.db?.getAllFromIndex("cards", "leitnerBox") || [];
    }

    async getChapter(id: string): Promise<StorageChapter> {
        return await this.db?.get("chapters", id) || new StorageChapter(id);
    }

    async storeChapter(chapter: StorageChapter) {
        return await this.db?.put("chapters", chapter, chapter.id);
    }

    async getQuizSet(name: string = "default"): Promise<StorageQuizSet> {
        return await this.db?.get("quizSets", name) || new StorageQuizSet(name);
    }

    async storeQuizSet(quiz: StorageQuizSet) {
        return await this.db?.put("quizSets", quiz, quiz.name);
    }

    private async connect(database: string ) {
        this.db = await openDB<BoxDatabase>(database, this.dbVersion, {
            upgrade(db) {
                const cardStore = db.createObjectStore("cards", {
                    keyPath: "id"
                });
                cardStore.createIndex("leitnerBox", "leitnerBox");
                
                const chapterStore = db.createObjectStore("chapters", {
                    keyPath: "id"
                });

                const quizStore = db.createObjectStore("quizSets", {
                    keyPath: "name"
                });
            }
        });
    }
}