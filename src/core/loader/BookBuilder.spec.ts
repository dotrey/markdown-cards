import { expect } from "chai";
import "mocha";
import { PathMerger } from "../utility/PathMerger";
import { BookBuilder } from "./BookBuilder";
import { CardSetLoader } from "./CardSetLoader";
import { FileLoader } from "./FileLoader";

describe("Book Builder", function () {
    it("parses single chapter", function () {
        const builder = new BookBuilder(new CardSetLoader(new FileLoader()), new PathMerger("http://test.local"));
        builder.appendContent(`[Chapter 1](./chapter1.md)`);
        const book = builder.build();

        expect(book.chapters.length).to.be.equal(1);
        expect(book.chapters[0].file).to.be.equal("http://test.local/chapter1.md");
    });

    it("parses multiple chapters in single line", function () {
        const builder = new BookBuilder(new CardSetLoader(new FileLoader()), new PathMerger("http://test.local"));
        builder.appendContent(`[Chapter 1](./chapter1.md) [Chapter 2](./chapter2.md) [Chapter 3](./chapter3.md)`);
        const book = builder.build();

        expect(book.chapters.length).to.be.equal(3);
        expect(book.chapters[0].file).to.be.equal("http://test.local/chapter1.md");
        expect(book.chapters[1].file).to.be.equal("http://test.local/chapter2.md");
        expect(book.chapters[2].file).to.be.equal("http://test.local/chapter3.md");
    });

    it("parses multiple chapters multiple lines", function () {
        const builder = new BookBuilder(new CardSetLoader(new FileLoader()), new PathMerger("http://test.local"));
        builder.appendContent(`
        - [Chapter 1](./chapter1.md)
        - Another Chapter is [Chapter 2](./chapter2.md)
        - [Chapter 3](./chapter3.md)
        `);
        const book = builder.build();

        expect(book.chapters.length).to.be.equal(3);
        expect(book.chapters[0].file).to.be.equal("http://test.local/chapter1.md");
        expect(book.chapters[1].file).to.be.equal("http://test.local/chapter2.md");
        expect(book.chapters[2].file).to.be.equal("http://test.local/chapter3.md");
    });
});