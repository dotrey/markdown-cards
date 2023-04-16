export class StorageQuizSet {
    name: string;
    chapters: string[] = [];

    constructor(name: string) {
        this.name = name;
    }
}