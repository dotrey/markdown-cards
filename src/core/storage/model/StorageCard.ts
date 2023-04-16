export class StorageCard {
    id: string = "";
    leitnerBox: number = 0;
    firstQuizzed: number = 0;
    lastQuizzed: number = 0;
    quizCount: number = 0;
    quizStreak: number = 0;

    constructor(id: string) {
        this.id = id;
    }
}