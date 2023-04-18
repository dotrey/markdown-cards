import type { BoxStorage } from "./BoxStorage";

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
        this.storage.storeCard(card);
    }

    async cardKnown(id: string) {
        let card = await this.storage.getCard(id);
        if (card.leitnerBox < 4) {
            card.leitnerBox++;
        }
        card.quizStreak++;
        this.storage.storeCard(card);
    }

    async cardNotKnown(id: string) {
        let card = await this.storage.getCard(id);
        if (card.leitnerBox > 0) {
            card.quizStreak = 0;
        } else {
            card.quizStreak--;
        }
        card.leitnerBox = 0;
        this.storage.storeCard(card);
    }

    dateStamp(date?: Date): number {
        const now = date || new Date();
        return now.getUTCFullYear() * 10000 +
            now.getUTCMonth() * 100 +
            now.getUTCDate();
    }
}