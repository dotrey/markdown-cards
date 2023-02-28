import { describe, expect, it } from 'vitest';
import { CardSetLoader } from './CardSetLoader';
import { SingleCard } from './CardSetParser.test';
import { FileLoader } from './FileLoader';
import * as fs from 'node:fs/promises';
import { MD5 } from 'crypto-js';

describe('Card Set Loader', function () {
  it('loads a single card', function () {
    const loader = new CardSetLoader(new DummyLoader());
    return loader.load(SingleCard).then((cardSet) => {
      expect(cardSet.length).to.be.equal(1);

      const card = cardSet.card(0);
      expect(card).to.be.not.undefined;
      expect(card.sides[0].raw.title).to.be.equal('Side A');
      expect(card.sides[1].raw.title).to.be.equal('Side B');
    });
  });

  it('loads a md file', function () {
    const loader = new CardSetLoader(new LocalFileLoader());
    return loader.load('./test/cards/cardset-1.md').then((cardSet) => {
      expect(cardSet.length).to.be.equal(3);

      const card = cardSet.card(0);
      expect(card).to.be.not.undefined;
      expect(card.sides[0].raw.title).to.be.equal('Card 1 Side A');
      expect(card.sides[1].raw.title).to.be.equal('Card 1 Side B');
    });
  });

  it('loads a more complex md file', function () {
    const loader = new CardSetLoader(new LocalFileLoader());
    const file = './test/cards/cardset-2.md';
    const fileHash = MD5(file).toString();
    return loader.load(file).then((cardSet) => {
      expect(cardSet.title).to.be.equal('Cardset 2');
      expect(cardSet.abstract).to.be.equal('A more elaborate test.');
      expect(cardSet.length).to.be.equal(3);
      expect(cardSet.id).to.be.equal(fileHash);

      const card1 = cardSet.card(0);
      expect(card1).to.be.not.undefined;
      expect(card1.sides[0].raw.title).to.be.equal('Card 1 Side A');
      expect(card1.sides[0].raw.body).to.be.equal('This is 1/A.');
      expect(card1.sides[1].raw.title).to.be.equal('Card 1 Side B');
      expect(card1.sides[1].raw.body).to.be.equal('This is 1/B.');
      expect(card1.id)
        .to.be.a('string')
        .and.satisfies((value: string) => {
          return value.startsWith(fileHash + '-');
        });

      const card2 = cardSet.card(1);
      expect(card2).to.be.not.undefined;
      expect(card2.sides[0].raw.title).to.be.equal('Card 2 Side A');
      expect(card2.sides[0].raw.body).to.be.equal('This is 2/A.');
      expect(card2.sides[1].raw.title).to.be.equal('Card 2 Side B');
      expect(card2.sides[1].raw.body).to.be.equal('This is 2/B.');
      expect(card2.id)
        .to.be.a('string')
        .and.satisfies((value: string) => {
          return value.startsWith(fileHash + '-');
        });

      const card3 = cardSet.card(2);
      expect(card3).to.be.not.undefined;
      expect(card3.sides[0].raw.title).to.be.equal('Card 3 Side A');
      expect(card3.sides[0].raw.body).to.be.equal('This is 3/A.');
      expect(card3.sides[1].raw.title).to.be.equal('Card 3 Side B');
      expect(card3.sides[1].raw.body).to.be.equal('This is 3/B.');
      expect(card3.id)
        .to.be.a('string')
        .and.satisfies((value: string) => {
          return value.startsWith(fileHash + '-');
        });

      expect(card1.id).to.not.equal(card2.id);
      expect(card1.id).to.not.equal(card3.id);
      expect(card2.id).to.not.equal(card3.id);
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
    const content = await fs.readFile(file).then((buffer) => {
      return buffer.toString();
    });
    return content;
  }
}
