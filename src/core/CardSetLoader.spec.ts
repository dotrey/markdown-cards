import { expect } from "chai";
import "mocha";
import { FileLoader } from "../file/FileLoader";
import { CardSetLoader } from "./CardSetLoader";
import { SingleCard } from "./CardSetParser.spec";

describe("Card Set Loader", function () {
    it("loads a single card", function () {
        const loader = new CardSetLoader(new DummyLoader());
        return loader.load("single-card")
            .then((cardSet) => {
                expect(cardSet.length).to.be.equal(1);
                const card = cardSet.card(0);
                expect(card).to.be.not.undefined;
                expect(card.sideA.titleRaw).to.be.equal("Side A");
                expect(card.sideB.titleRaw).to.be.equal("Side B");
            });
    });
});

class DummyLoader extends FileLoader {
    async load(_file: string) {
        return SingleCard;
    }
}