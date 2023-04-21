import "fake-indexeddb/auto";
import { IDBFactory } from "fake-indexeddb";
import { beforeEach, describe, expect, it } from "vitest";
import { StorageCard } from "./model/StorageCard";
import { BoxStorage } from "./BoxStorage";
import { LeitnerSystem } from "./LeitnerSystem";
import { StorageQuizSet } from "./model/StorageQuizSet";

describe('Leitner System', function () {
    beforeEach(function () {
        // Make sure the indexedDB is empty
        indexedDB = new IDBFactory();
    });

    it("marks a card as shown", async function () {
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

    it("marks a card as known", async function () {
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

    it("marks a card as not known", async function () {
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

    it("creates a quiz generator with active chapter", async function () {
        let storage = new BoxStorage("default");
        let leitner = new LeitnerSystem(storage);
        const chapters = ["a", "b", "c"];
        for (let i = 0; i < 5; i++) {
            for (const chapter of chapters) {
                let card = new StorageCard(`${chapter}-${i}`);
                card.leitnerBox = i;
                await storage.storeCard(card);
            }
        }
        const quizSet = new StorageQuizSet("default");
        quizSet.chapters = ["a", "c"];

        const quiz = await leitner.quizGenerator(quizSet);
        let count = 0;
        for (let cardId of quiz) {
            expect(cardId?.split("-")[0]).to.not.equal("b");
            count++;
        }
        expect(count).to.equal(10);
    });

    it("creates a quiz generator with random order", async function () {
        let storage = new BoxStorage("default");
        let leitner = new LeitnerSystem(storage);
        for (let i = 0; i < 5; i++) {
            let card = new StorageCard(`a-${i}`);
            card.leitnerBox = i;
            await storage.storeCard(card);
        }
        const quizSet = new StorageQuizSet("default");
        quizSet.chapters = ["a"];

        const distribution = [0, 0, 0, 0, 0];

        for (let i = 0; i < 10000; i++) {
            const quiz = await leitner.quizGenerator(quizSet);
            const card = parseInt(quiz.next().value!.split("-")[1]);
            distribution[card]++;
        }

        // console.log(distribution);
        expect(distribution[0]).to.be.greaterThan(distribution[1]);
        expect(distribution[1]).to.be.greaterThan(distribution[2]);
        expect(distribution[2]).to.be.greaterThan(distribution[3]);
        expect(distribution[3]).to.be.greaterThan(distribution[4]);

    }, 60000);
});