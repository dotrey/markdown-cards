import { FileLoader } from "../file/FileLoader";
import { CardSet } from "./CardSet";
import { CardSetBuilder } from "./CardSetBuilder";
import { CardSetParser } from "./CardSetParser";

export class CardSetLoader {
    private parser: CardSetParser;

    constructor(private fileLoader: FileLoader) {
        this.parser = new CardSetParser();
    }

    async load(file: string): Promise<CardSet> {
        try {
            let content = await this.fileLoader.load(file);
            return this.parser.parse(content);
        } catch (e) {
            return this.buildErrorSet((e as Error).message, file)
        }
    }

    private buildErrorSet(message: string, file: string) {
        return (new CardSetBuilder()).buildErrorSet(message, file);
    }
}