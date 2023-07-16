import type { Chapter } from "../model/Chapter";
import type { BoxStorage } from "./BoxStorage";
import type { StorageQuizSet } from "./model/StorageQuizSet";

export class QuizMaster {

    constructor (private storage: BoxStorage ){}

    async getQuizSet(name: string = "default") {
        return this.storage.getQuizSet(name);
    }

    async enableChapter(chapter: Chapter | Chapter[], quizSet: string = "default"): Promise<StorageQuizSet> {
        if (!Array.isArray(chapter)) {
            chapter = [chapter];
        }
        return this.storage.getQuizSet(quizSet)
            .then(async (set: StorageQuizSet) => {
                for (const c of (chapter as Chapter[])) {
                    if (!set.chapters.includes(c.id)) {
                        set.chapters.push(c.id);
                    }
                }
                await this.storage.storeQuizSet(set);
                return set;
            });
    }

    async disableChapter(chapter: Chapter | Chapter[], quizSet: string = "default"): Promise<StorageQuizSet> {
        if (!Array.isArray(chapter)) {
            chapter = [chapter];
        }
        return this.storage.getQuizSet(quizSet)
            .then(async(set: StorageQuizSet) => {
                for (const c of (chapter as Chapter[])) {
                    if (set.chapters.includes(c.id)) {
                        set.chapters.splice(set.chapters.indexOf(c.id), 1);
                    }
                }
                await this.storage.storeQuizSet(set);
                return set;
            });
    }
}