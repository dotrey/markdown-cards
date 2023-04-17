import type { BoxDatabase } from "./BoxDatabase";
import { StorageCard } from "./model/StorageCard";
import { StorageChapter } from "./model/StorageChapter";
import { StorageQuizSet } from "./model/StorageQuizSet";
import { openDB, type IDBPDatabase } from "idb/with-async-ittr";

export class BoxStorage {

    private db: IDBPDatabase<BoxDatabase>|null = null;
    private dbVersion: number = 1;

    constructor(private dbName: string) {
    }

    async getCard(id: string): Promise<StorageCard> {
        await this.connect();
        return await this.db!.get("cards", id) || new StorageCard(id);
    }

    async storeCard(card: StorageCard) {
        await this.connect();
        return await this.db!.put("cards", card);
    }

    async getCardsByBox(box: number): Promise<StorageCard[]> {
        await this.connect();
        box = Math.min(5, Math.max(0, box));
        return this.db!.getAllFromIndex("cards", "leitnerBox", box) || [];
    }

    async getChapter(id: string): Promise<StorageChapter> {
        await this.connect();
        return await this.db!.get("chapters", id) || new StorageChapter(id);
    }

    async storeChapter(chapter: StorageChapter) {
        await this.connect();
        return await this.db!.put("chapters", chapter);
    }

    async getQuizSet(name: string = "default"): Promise<StorageQuizSet> {
        await this.connect();
        return await this.db!.get("quizSets", name) || new StorageQuizSet(name);
    }

    async storeQuizSet(quiz: StorageQuizSet) {
        await this.connect();
        return await this.db!.put("quizSets", quiz);
    }

    private async connect(reconnect: boolean = false) {
        if (this.db && !reconnect) {
            return;
        }
        this.db = await openDB<BoxDatabase>(this.dbName, this.dbVersion, {
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