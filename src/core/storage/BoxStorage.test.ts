import "fake-indexeddb/auto";
import { IDBFactory } from "fake-indexeddb";
import { beforeEach, describe, expect, it } from "vitest";
import { BoxStorage } from "./BoxStorage";
import { StorageCard } from "./model/StorageCard";
import { StorageChapter } from "./model/StorageChapter";
import { StorageQuizSet } from "./model/StorageQuizSet";

describe('BoxStorage', function () {
    beforeEach(function () {
        // Make sure the indexedDb is empty
        indexedDB = new IDBFactory();
    });

    //// StorageCard

    it('returns a default card for unknown id', async function () {
        const box: BoxStorage = new BoxStorage("default");
        const card: StorageCard = await box.getCard("my-id");

        expect(card.id).to.be.equal("my-id");
        expect(card.leitnerBox).to.equal(0);
        expect(card.firstQuizzed).to.equal(0);
        expect(card.lastQuizzed).to.equal(0);
        expect(card.quizCount).to.equal(0);
        expect(card.quizStreak).to.equal(0);
    });

    it('stores and loads a card', async function () {
        const box: BoxStorage = new BoxStorage("default");
        const original = new StorageCard("card-id");
        original.leitnerBox = 3;
        original.firstQuizzed = 20230415;
        original.lastQuizzed = 20230417;
        original.quizCount = 5;
        original.quizStreak = 2;

        let tmp = await box.storeCard(original);

        const card = await box.getCard("card-id");
        expect(card.id).to.be.equal(original.id);
        expect(card.leitnerBox).to.equal(original.leitnerBox);
        expect(card.firstQuizzed).to.equal(original.firstQuizzed);
        expect(card.lastQuizzed).to.equal(original.lastQuizzed);
        expect(card.quizCount).to.equal(original.quizCount);
        expect(card.quizStreak).to.equal(original.quizStreak);
    });

    it('updates a card', async function () {
        const box: BoxStorage = new BoxStorage("default");
        const original = await box.getCard("update-me");
        expect(original.firstQuizzed).to.equal(0);

        original.firstQuizzed = 202304001;
        await box.storeCard(original);

        original.firstQuizzed = 202304002;
        await box.storeCard(original);

        const card = await box.getCard("update-me");
        expect(card.firstQuizzed).to.equal(202304002);
    });

    it('returns all cards for a leitner box', async function () {
        const box: BoxStorage = new BoxStorage("default");
        // box distribution:
        // 0 - 3 cards
        // 1 - 2 cards
        // 2 - 2 cards
        // 3 - 1 card
        // 4 - 4 cards
        const boxSizes = [3, 2, 2, 1, 4];
        const cardBoxes = [0, 1, 3, 2, 4, 0, 0, 4, 4, 4, 2, 1];
        let index: number = 0;
        for (const cardBox of cardBoxes) {
            const card = new StorageCard(`card-${index}`);
            card.leitnerBox = cardBox;
            await box.storeCard(card);
            index++;
        }

        let boxes: StorageCard[][] = [];
        boxes[0] = await box.getCardsByBox(0);
        boxes[1] = await box.getCardsByBox(1);
        boxes[2] = await box.getCardsByBox(2);
        boxes[3] = await box.getCardsByBox(3);
        boxes[4] = await box.getCardsByBox(4);

        for (let i = 0; i < 5; i++) {
            expect(boxes[i].length).to.equal(boxSizes[i]);
            boxes[i].forEach((card) => {
                expect(card.leitnerBox).to.equal(i);
            });
        }
    });

    //// StorageChapter

    it('returns a chapter for unknown id', async function () {
        const box: BoxStorage = new BoxStorage("default");
        const chapter = await box.getChapter("chapter-1");

        expect(chapter.id).to.equal("chapter-1");
        expect(chapter.cardCount).to.equal(0);
        expect(chapter.leitnerDistribution).to.eql([0, 0, 0, 0, 0]);
    });

    it('stores and loads a chapter', async function () {
        const box: BoxStorage = new BoxStorage("default");
        const original = new StorageChapter("chapter-2");
        original.cardCount = 15;
        original.leitnerDistribution = [1, 2, 3, 4, 5];
        await box.storeChapter(original);

        const chapter = await box.getChapter("chapter-2");
        expect(chapter.id).to.equal("chapter-2");
        expect(chapter.cardCount).to.equal(15);
        expect(chapter.leitnerDistribution).to.eql([1, 2, 3, 4, 5]);

    });

    it('updates a chapter', async function () {
        const box: BoxStorage = new BoxStorage("default");
        const original = new StorageChapter("chapter-2");
        original.cardCount = 15;
        original.leitnerDistribution = [1, 2, 3, 4, 5];
        await box.storeChapter(original);

        original.leitnerDistribution = [15, 0, 0, 0, 0];
        await box.storeChapter(original);

        original.leitnerDistribution = [5, 4, 3, 2, 1];
        await box.storeChapter(original);
        
        const chapter = await box.getChapter("chapter-2");
        expect(chapter.id).to.equal("chapter-2");
        expect(chapter.cardCount).to.equal(15);
        expect(chapter.leitnerDistribution).to.eql([5, 4, 3, 2, 1]);

    });

    //// StorageQuizSet
    
    it('returns a quiz set for unknown id', async function () {
        const box: BoxStorage = new BoxStorage("default");
        const quiz = await box.getQuizSet("quizzy");

        expect(quiz.name).to.equal("quizzy");
        expect(quiz.chapters).to.eql([]);
    });
    
    it('stores a quiz set', async function () {
        const box: BoxStorage = new BoxStorage("default");
        const original = new StorageQuizSet("stored-1");
        original.chapters = ["a", "b", "c"];

        await box.storeQuizSet(original);

        const quiz = await box.getQuizSet("stored-1");
        expect(quiz.name).to.equal("stored-1");
        expect(quiz.chapters).to.eql(["a", "b", "c"]);
    });
    
    it('updates a quiz set', async function () {
        const box: BoxStorage = new BoxStorage("default");
        const original = new StorageQuizSet("stored-1");
        original.chapters = ["a", "b", "c"];
        await box.storeQuizSet(original);

        original.chapters.push("d");
        await box.storeQuizSet(original);

        const quiz = await box.getQuizSet("stored-1");
        expect(quiz.name).to.equal("stored-1");
        expect(quiz.chapters).to.eql(["a", "b", "c", "d"]);
    });
});