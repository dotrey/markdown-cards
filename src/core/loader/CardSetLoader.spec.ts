import { expect } from "chai";
import "mocha";
import { CardSetLoader } from "./CardSetLoader";
import { SingleCard } from "./CardSetParser.spec";
import { FileLoader } from "./FileLoader";
import * as fs from "node:fs/promises";

describe("Card Set Loader", function () {
    it("loads a single card", function () {
        const loader = new CardSetLoader(new DummyLoader());
        return loader.load(SingleCard)
            .then((cardSet) => {
                expect(cardSet.length).to.be.equal(1);
                const card = cardSet.card(0);
                expect(card).to.be.not.undefined;
                expect(card.sideA.titleRaw).to.be.equal("Side A");
                expect(card.sideB.titleRaw).to.be.equal("Side B");
            });
    });

    it("loads a md file", function () {
        const loader = new CardSetLoader(new LocalFileLoader());
        return loader.load("./test/cards/cardset-1.md")
            .then((cardSet) => {
                expect(cardSet.length).to.be.equal(3);
                const card = cardSet.card(0);
                expect(card).to.be.not.undefined;
                expect(card.sideA.titleRaw).to.be.equal("Card 1 Side A");
                expect(card.sideB.titleRaw).to.be.equal("Card 1 Side B");
            });
    });
    

    it("loads a different md file", function () {
        const loader = new CardSetLoader(new LocalFileLoader());
        return loader.load("./test/cards/cardset-1.md")
            .then((cardSet) => {
                expect(cardSet.length).to.be.equal(3);
                const card1 = cardSet.card(0);
                expect(card1).to.be.not.undefined;
                expect(card1.sideA.titleRaw).to.be.equal("Card 1 Side A");
                expect(card1.sideB.titleRaw).to.be.equal("Card 1 Side B");
                const card2 = cardSet.card(1);
                expect(card2).to.be.not.undefined;
                expect(card2.sideA.titleRaw).to.be.equal("Card 2 Side A");
                expect(card2.sideB.titleRaw).to.be.equal("Card 2 Side B");
                const card3 = cardSet.card(2);
                expect(card3).to.be.not.undefined;
                expect(card3.sideA.titleRaw).to.be.equal("Card 3 Side A");
                expect(card3.sideB.titleRaw).to.be.equal("Card 3 Side B");
            });
    });
});

class DummyLoader extends FileLoader {
    async load(value: string) {
        return value;
    }
}

// Note: the "fs" file system is used because I couldn't get "fetch()" to work
class LocalFileLoader extends FileLoader {
    async load(file: string) {
        const content = await fs.readFile(file)
            .then((buffer) => {
                return buffer.toString();
            })
        return content;
    }
}