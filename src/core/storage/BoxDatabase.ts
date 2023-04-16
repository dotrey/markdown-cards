import type { DBSchema } from "idb";

export interface BoxDatabase extends DBSchema {
    cards: {
        value: {
            id: string,
            leitnerBox: number,
            firstQuizzed: number,
            lastQuizzed: number,
            quizCount: number,
            quizStreak: number
        },
        key: string,
        indexes: {
            leitnerBox: number
        }
    };

    chapters: {
        value: {
            id: string,
            cardCount: number,
            leitnerDistribution: number[]
        },
        key: string,
    }

    quizSets: {
        value: {
            name: string,
            chapters: string[]
        },
        key: string;
    }
}