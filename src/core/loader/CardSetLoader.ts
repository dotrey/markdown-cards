import { CardSet } from "../model/CardSet";
import { CardSetBuilder } from "./CardSetBuilder";
import { CardSetParser } from "./CardSetParser";
import { FileLoader } from "./FileLoader";

export class CardSetLoader {
    private parser: CardSetParser;

    constructor(private fileLoader: FileLoader) {
        this.parser = new CardSetParser();
    }

    async load(file: string): Promise<CardSet> {
        try {
            let content = await this.fileLoader.load(file);
            return this.parser.parse(content, file);
        } catch (e) {
            return this.buildErrorSet((e as Error).message, file)
        }
    }

    private buildErrorSet(message: string, file: string) {
        return (new CardSetBuilder(file)).buildErrorSet(message, file);
    }
}