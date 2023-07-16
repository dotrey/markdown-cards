import "fake-indexeddb/auto";
import { IDBFactory } from "fake-indexeddb";
import { beforeEach, describe, expect, it } from "vitest";
import { CardSetLoader } from "../loader/CardSetLoader";
import { FileLoader } from "../loader/FileLoader";
import { Chapter } from "../model/Chapter";
import { BoxStorage } from "./BoxStorage";
import { QuizMaster } from "./QuizMaster";

describe('QuizMaster', function () {
    beforeEach(function () {
        // Make sure the indexedDB is empty
        indexedDB = new IDBFactory();
    });

    it('enables a chapter and saves the set', async function () {
        const box: BoxStorage = new BoxStorage("default");
        const loader = new CardSetLoader(new DummyLoader());
        const master = new QuizMaster(box);
        const setName: string = "default";

        const chapter: Chapter = new Chapter("test-file.md", "test-chapter", loader);

        let empty = await master.getQuizSet(setName);
        expect(empty.chapters.length).to.be.equal(0);

        let returned = await master.enableChapter(chapter);
        expect(returned.chapters.length).to.be.equal(1);
        expect(returned.chapters[0]).to.be.equal(chapter.id);

        let loaded = await master.getQuizSet(setName);
        expect(loaded.chapters.length).to.be.equal(1);
        expect(loaded.chapters[0]).to.be.equal(chapter.id);
    });

    it('disables a chapter and saves the set', async function () {
        const box: BoxStorage = new BoxStorage("default");
        const loader = new CardSetLoader(new DummyLoader());
        const master = new QuizMaster(box);
        const setName: string = "default";

        const chapter: Chapter = new Chapter("test-file.md", "test-chapter", loader);


        let returned = await master.enableChapter(chapter);
        expect(returned.chapters.length).to.be.equal(1);
        expect(returned.chapters[0]).to.be.equal(chapter.id);
        
        let empty = await master.disableChapter(chapter);
        expect(empty.chapters.length).to.be.equal(0);

        let loaded = await master.getQuizSet(setName);
        expect(loaded.chapters.length).to.be.equal(0);
    });

    it('enables multiple chapters and saves the set', async function () {
        const box: BoxStorage = new BoxStorage("default");
        const loader = new CardSetLoader(new DummyLoader());
        const master = new QuizMaster(box);
        const setName: string = "default";

        const chapter1: Chapter = new Chapter("test-file1.md", "test-chapter1", loader);
        const chapter2: Chapter = new Chapter("test-file2.md", "test-chapter2", loader);

        let empty = await master.getQuizSet(setName);
        expect(empty.chapters.length).to.be.equal(0);

        let returned = await master.enableChapter([chapter1, chapter2]);
        expect(returned.chapters.length).to.be.equal(2);
        expect(returned.chapters.includes(chapter1.id)).to.be.true;
        expect(returned.chapters.includes(chapter2.id)).to.be.true;

        let loaded = await master.getQuizSet(setName);
        expect(returned.chapters.length).to.be.equal(2);
        expect(returned.chapters.includes(chapter1.id)).to.be.true;
        expect(returned.chapters.includes(chapter2.id)).to.be.true;
    });

    it('disables a chapter and saves the set', async function () {
        const box: BoxStorage = new BoxStorage("default");
        const loader = new CardSetLoader(new DummyLoader());
        const master = new QuizMaster(box);
        const setName: string = "default";

        const chapter1: Chapter = new Chapter("test-file1.md", "test-chapter1", loader);
        const chapter2: Chapter = new Chapter("test-file2.md", "test-chapter2", loader);


        let returned = await master.enableChapter([chapter1, chapter2]);
        expect(returned.chapters.length).to.be.equal(2);
        expect(returned.chapters.includes(chapter1.id)).to.be.true;
        expect(returned.chapters.includes(chapter2.id)).to.be.true;
        
        let empty = await master.disableChapter(chapter1);
        expect(empty.chapters.length).to.be.equal(1);
        expect(empty.chapters[0]).to.be.equal(chapter2.id);

        let loaded = await master.getQuizSet(setName);
        expect(loaded.chapters.length).to.be.equal(1);
        expect(loaded.chapters[0]).to.be.equal(chapter2.id);
    });

});

class DummyLoader extends FileLoader {
    async load(value: string) {
      return value;
    }
  }