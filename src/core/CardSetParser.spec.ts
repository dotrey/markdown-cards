import { expect } from "chai";
import "mocha";
import { CardSetParser } from "./CardSetParser";

describe("Card Set Parser", function () {
    it("parses a set with a single card", function () {
        const parser = new CardSetParser();
        const cardSet = parser.parse(SingleCard);
        expect(cardSet.length).to.be.equal(1);
        const card = cardSet.card(0);
        expect(card).to.be.not.undefined;
        expect(card.sideA().titleRaw()).to.be.equal("Side A");
        expect(card.sideB().titleRaw()).to.be.equal("Side B");
    });

    it("parses a set with a single card and title", function () {
        const parser = new CardSetParser();
        const cardSet = parser.parse(SingleCardWithTitle);
        expect(cardSet.length).to.be.equal(1);
        expect(cardSet.title).to.be.equal("Card Set");
        expect(cardSet.abstract).to.be.equal("This is a card set.");
        const card = cardSet.card(0);
        expect(card).to.be.not.undefined;
        expect(card.sideA().titleRaw()).to.be.equal("Side A");
        expect(card.sideB().titleRaw()).to.be.equal("Side B");
    });
});

export const SingleCard = `## Side A
### Side B`;

export const SingleCardWithTitle = `# Card Set
This is a card set.
## Side A
### Side B`;