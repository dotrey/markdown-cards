export class StorageChapter {
    id: string = "";
    cardCount: number = 0;
    leitnerDistribution: number[] = [0, 0, 0, 0, 0];

    constructor(id: string) {
        this.id = id;
    }
}