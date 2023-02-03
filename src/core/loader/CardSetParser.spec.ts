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
        expect(card.sides[0].titleRaw).to.be.equal("Side A");
        expect(card.sides[1].titleRaw).to.be.equal("Side B");
    });

    it("parses a set with a single card and title", function () {
        const parser = new CardSetParser();
        const cardSet = parser.parse(SingleCardWithTitle);

        expect(cardSet.length).to.be.equal(1);
        expect(cardSet.title).to.be.equal("Card Set");
        expect(cardSet.abstract).to.be.equal("This is a card set.");

        const card = cardSet.card(0);
        expect(card).to.be.not.undefined;
        expect(card.sides[0].titleRaw).to.be.equal("Side A");
        expect(card.sides[1].titleRaw).to.be.equal("Side B");

        expect(cardSet.card(1)).to.be.undefined;
    });

    it("parses a set with a multiple cards and title", function () {
        const parser = new CardSetParser();
        const cardSet = parser.parse(ThreeCardsWithTitle);

        expect(cardSet.length).to.be.equal(3);
        expect(cardSet.title).to.be.equal("Card Set");
        expect(cardSet.abstract).to.be.equal("This is a card set.");
        
        const card1 = cardSet.card(0);
        expect(card1).to.be.not.undefined;
        expect(card1.sides[0].titleRaw).to.be.equal("Side A1");
        expect(card1.sides[1].titleRaw).to.be.equal("Side B1");
        
        const card2 = cardSet.card(1);
        expect(card2).to.be.not.undefined;
        expect(card2.sides[0].titleRaw).to.be.equal("Side A2");
        expect(card2.sides[1].titleRaw).to.be.equal("Side B2");
        
        const card3 = cardSet.card(2);
        expect(card3).to.be.not.undefined;
        expect(card3.sides[0].titleRaw).to.be.equal("Side A3");
        expect(card3.sides[1].titleRaw).to.be.equal("Side B3");
        
        expect(cardSet.card(4)).to.be.undefined;
    });

    it("parses a set with a multiple cards with details and title", function () {
        const parser = new CardSetParser();
        const cardSet = parser.parse(ThreeCardsWithDetailsAndTitle);

        expect(cardSet.length).to.be.equal(3);
        expect(cardSet.title).to.be.equal("Card Set");
        expect(cardSet.abstract).to.be.equal("This is a card set.");
        
        const card1 = cardSet.card(0);
        expect(card1).to.be.not.undefined;
        expect(card1.sides[0].titleRaw).to.be.equal("Side A1");
        expect(card1.sides[0].bodyRaw).to.be.equal("Card 1 Side A");
        expect(card1.sides[1].titleRaw).to.be.equal("Side B1");
        expect(card1.sides[1].bodyRaw).to.be.equal("Card 1 Side B");
        
        const card2 = cardSet.card(1);
        expect(card2).to.be.not.undefined;
        expect(card2.sides[0].titleRaw).to.be.equal("Side A2");
        expect(card2.sides[0].bodyRaw).to.be.equal("Card 2 Side A");
        expect(card2.sides[1].titleRaw).to.be.equal("Side B2");        
        expect(card2.sides[1].bodyRaw).to.be.equal("Card 2 Side B Line 1\nCard 2 Side B Line 2");
        
        const card3 = cardSet.card(2);
        expect(card3).to.be.not.undefined;
        expect(card3.sides[0].titleRaw).to.be.equal("Side A3");
        expect(card3.sides[0].bodyRaw).to.be.equal("Card 3 Side A Line 1\nCard 3 Side A Line 2\nCard 3 Side A Line 3");
        expect(card3.sides[1].titleRaw).to.be.equal("Side B3");
        expect(card3.sides[1].bodyRaw).to.be.equal("Card 3 Side B Line 1\nCard 3 Side B Line 2");
        
        expect(cardSet.card(4)).to.be.undefined;
    });

    it("ignores content before the first card", function () {
        const parser = new CardSetParser();
        const cardSet = parser.parse(ContentBeforeCard);

        expect(cardSet.length).to.be.equal(1);
        expect(cardSet.title).to.be.equal("");
        expect(cardSet.abstract).to.be.equal("");
        
        const card1 = cardSet.card(0);
        expect(card1).to.be.not.undefined;
        expect(card1.sides[0].titleRaw).to.be.equal("Side A1");
        expect(card1.sides[0].bodyRaw).to.be.equal("Card 1 Side A");
        expect(card1.sides[1].titleRaw).to.be.equal("Side B1");
        expect(card1.sides[1].bodyRaw).to.be.equal("Card 1 Side B");
    });

    it("ignores additional level 1 headings before cards", function () {
        const parser = new CardSetParser();
        const cardSet = parser.parse(TwoLevel1Headings);

        expect(cardSet.length).to.be.equal(1);
        expect(cardSet.title).to.be.equal("Actual heading");
        expect(cardSet.abstract).to.be.equal("Abstract");
        
        const card1 = cardSet.card(0);
        expect(card1).to.be.not.undefined;
        expect(card1.sides[0].titleRaw).to.be.equal("Side A1");
        expect(card1.sides[0].bodyRaw).to.be.equal("");
        expect(card1.sides[1].titleRaw).to.be.equal("Side B1");
        expect(card1.sides[1].bodyRaw).to.be.equal("# Another l1 heading");
    });

    it("trims whitespaces at start and end", function () {
        const parser = new CardSetParser();
        const cardSet = parser.parse(TrimmableWhitespace);

        expect(cardSet.length).to.be.equal(2);
        expect(cardSet.title).to.be.equal("Samples with lot of whitespace");
        expect(cardSet.abstract).to.be.equal("");
        
        const card1 = cardSet.card(0);
        expect(card1).to.be.not.undefined;
        expect(card1.sides[0].titleRaw).to.be.equal("Side A1");
        expect(card1.sides[0].bodyRaw).to.be.equal("Card 1 Side A");
        expect(card1.sides[1].titleRaw).to.be.equal("Side B1");
        expect(card1.sides[1].bodyRaw).to.be.equal("Card 1 Side B");

        const card2 = cardSet.card(1);
        expect(card2).to.be.not.undefined;
        expect(card2.sides[0].titleRaw).to.be.equal("Side A2");
        expect(card2.sides[0].bodyRaw).to.be.equal("Card 2 Side A");
        expect(card2.sides[1].titleRaw).to.be.equal("Side B2");
        expect(card2.sides[1].bodyRaw).to.be.equal("Card 2 Side B");
    });

    it("ignores dangling level 3 heading", function () {
        const parser = new CardSetParser();
        const cardSet = parser.parse(DanglingLevel3Heading);

        expect(cardSet.length).to.be.equal(1);
        
        const card1 = cardSet.card(0);
        expect(card1).to.be.not.undefined;
        expect(card1.sides[0].titleRaw).to.be.equal("Side A1");
        expect(card1.sides[0].bodyRaw).to.be.equal("");
        expect(card1.sides[1].titleRaw).to.be.equal("Side B1");
        expect(card1.sides[1].bodyRaw).to.be.equal("");
    });
});

export const SingleCard = `## Side A
### Side B`;

export const SingleCardWithTitle = `# Card Set
This is a card set.
## Side A
### Side B`;

export const ThreeCards = `## Side A1
### Side B1

## Side A2
### Side B2
## Side A3
### Side B3`;

export const ThreeCardsWithTitle = `# Card Set
This is a card set.
## Side A1
### Side B1

## Side A2
### Side B2
## Side A3
### Side B3`;

export const ThreeCardsWithDetailsAndTitle = `# Card Set
This is a card set.
## Side A1
Card 1 Side A
### Side B1
Card 1 Side B

## Side A2
Card 2 Side A
### Side B2
Card 2 Side B Line 1
Card 2 Side B Line 2
## Side A3
Card 3 Side A Line 1
Card 3 Side A Line 2
Card 3 Side A Line 3
### Side B3
Card 3 Side B Line 1
Card 3 Side B Line 2`;

export const ContentBeforeCard = `No heading, this is not the abstract.

## Side A1
Card 1 Side A
### Side B1
Card 1 Side B`;

export const TwoLevel1Headings = `# Actual heading
Abstract

# A second l1 heading

## Side A1
### Side B1

# Another l1 heading`;

export const TrimmableWhitespace = `# Samples with lot of whitespace

##   Side A1  

Card 1 Side A

###  Side B1

    Card 1 Side B
    
## Side A2   
   Card 2 Side A   

###  Side B2   

  Card 2 Side B
  
`;

export const DanglingLevel3Heading = `# Actual heading
Abstract

### A dangling l3 heading
Ignore this

## Side A1
### Side B1`;