export class PathMerger {

    constructor(public baseUrl: string) {

    }

    merge(path: string): string {
        return new URL(path, this.baseUrl).toString();
    }

}