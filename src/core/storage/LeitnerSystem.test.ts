import "fake-indexeddb/auto";
import { IDBFactory } from "fake-indexeddb";
import { beforeEach, describe, expect, it } from "vitest";
import { StorageCard } from "./model/StorageCard";
import { BoxStorage } from "./BoxStorage";
import { LeitnerSystem } from "./LeitnerSystem";

describe('Leitner System', function () {
    beforeEach(function () {
        // Make sure the indexedDB is empty
        indexedDB = new IDBFactory();
    });

    it('marks a card as shown', async function () {
        let card = new StorageCard("card-12345");
        let storage = new BoxStorage("default");
        let leitner = new LeitnerSystem(storage);

        await storage.storeCard(card);
        expect(card.firstQuizzed).to.equal(0);

        card = await storage.getCard("card-12345");
        expect(card.firstQuizzed).to.equal(0);
        expect(card.lastQuizzed).to.equal(0);
        expect(card.quizCount).to.equal(0);
        expect(card.quizStreak).to.equal(0);

        await leitner.cardShown("card-12345");

        card = await storage.getCard("card-12345");
        expect(card.firstQuizzed).to.be.greaterThan(0);
        expect(card.firstQuizzed).to.equal(card.lastQuizzed);
        expect(card.quizCount).to.equal(1);
        expect(card.quizStreak).to.equal(0);
    });

    it('marks a card as known', async function () {
        let card = new StorageCard("card-2");
        let storage = new BoxStorage("default");
        let leitner = new LeitnerSystem(storage);

        await storage.storeCard(card);
        expect(card.leitnerBox).to.equal(0);

        card = await storage.getCard("card-2");
        expect(card.leitnerBox).to.equal(0);
        expect(card.quizStreak).to.equal(0);

        await leitner.cardKnown("card-2");
        card = await storage.getCard("card-2");
        expect(card.leitnerBox).to.equal(1);
        expect(card.quizStreak).to.equal(1);

        await leitner.cardKnown("card-2");
        card = await storage.getCard("card-2");
        expect(card.leitnerBox).to.equal(2);
        expect(card.quizStreak).to.equal(2);

        await leitner.cardKnown("card-2");
        card = await storage.getCard("card-2");
        expect(card.leitnerBox).to.equal(3);
        expect(card.quizStreak).to.equal(3);

        await leitner.cardKnown("card-2");
        card = await storage.getCard("card-2");
        expect(card.leitnerBox).to.equal(4);
        expect(card.quizStreak).to.equal(4);

        await leitner.cardKnown("card-2");
        card = await storage.getCard("card-2");
        expect(card.leitnerBox).to.equal(4);
        expect(card.quizStreak).to.equal(5);
    });

    it('marks a card as not known', async function () {
        let card = new StorageCard("card-3");
        card.leitnerBox = 1;
        card.quizStreak = 2;
        let storage = new BoxStorage("default");
        let leitner = new LeitnerSystem(storage);

        await storage.storeCard(card);

        card = await storage.getCard("card-3");
        expect(card.leitnerBox).to.equal(1);
        expect(card.quizStreak).to.equal(2);

        await leitner.cardNotKnown("card-3");
        card = await storage.getCard("card-3");
        expect(card.leitnerBox).to.equal(0);
        expect(card.quizStreak).to.equal(0);

        await leitner.cardNotKnown("card-3");
        card = await storage.getCard("card-3");
        expect(card.leitnerBox).to.equal(0);
        expect(card.quizStreak).to.equal(-1);
    });
});