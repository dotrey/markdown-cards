import type { BoxStorage } from "./BoxStorage";
import type { StorageQuizSet } from "./model/StorageQuizSet";

export class LeitnerSystem {

    constructor(private storage: BoxStorage) {
    }

    async cardShown(id: string) {
        let card = await this.storage.getCard(id);
        const now: number = this.dateStamp();
        if (!card.firstQuizzed) {
            card.firstQuizzed = now;
        }
        card.lastQuizzed = now;
        card.quizCount++;
        await this.storage.storeCard(card);
    }

    async cardKnown(id: string) {
        let card = await this.storage.getCard(id);
        if (card.leitnerBox < 4) {
            card.leitnerBox++;
        }
        card.quizStreak++;
        await this.storage.storeCard(card);
    }

    async cardNotKnown(id: string) {
        let card = await this.storage.getCard(id);
        if (card.leitnerBox > 0) {
            card.quizStreak = 0;
        } else {
            card.quizStreak--;
        }
        card.leitnerBox = 0;
        await this.storage.storeCard(card);
    }

    async quizGenerator(quizSet: StorageQuizSet): Promise<Generator<string | undefined, string, unknown>> {
        const boxes: string[][] = [];

        for (let i = 0; i < 5; i++) {
            boxes[i] = (await this.storage.getCardsByBox(i))
                .map((card) => card.id)
                .filter((id: string) => {
                    const chapterId: string = id.split("-")[0];
                    return quizSet.chapters.includes(chapterId);
                });
            this.shuffle(boxes[i]);
        }

        const chances: number[] = [16, 8, 4, 2, 1];
        const generator = function* () {
            let length: number = 0;
            for (let i = 0; i < 5; i++) {
                length += boxes[i].length;
            }
            while (length > 0) {
                const rnd = Math.floor(Math.random() * 32) + 1;
                for (let i = 0; i < 5; i++) {
                    if (boxes[i].length > 0 && rnd >= chances[i]) {
                        length--;
                        yield boxes[i].shift();
                        break;
                    }
                }
            }

            return "";
        }();

        return generator;
    }

    dateStamp(date?: Date): number {
        const now = date || new Date();
        return now.getUTCFullYear() * 10000 +
            now.getUTCMonth() * 100 +
            now.getUTCDate();
    }

    shuffle(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    }
}