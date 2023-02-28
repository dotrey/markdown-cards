import { describe, expect, it } from 'vitest';
import { PathMerger } from '../utility/PathMerger';
import { FileLoader } from './FileLoader';
import { LibraryParser } from './LibraryParser';

describe('Library Parser', function () {
  it('parses library with only title', function () {
    const parser = new LibraryParser();
    const lib = parser.parse(LibOnlyTitle, new FileLoader(), new PathMerger('http://test.local'));

    expect(lib.name).to.be.equal('Library 1');
    expect(lib.books.length).to.be.equal(0);
  });

  it('parses library with one book', function () {
    const parser = new LibraryParser();
    const lib = parser.parse(
      LibOneBook,
      new FileLoader(),
      new PathMerger('http://test.local/mdc/')
    );

    expect(lib.name).to.be.equal('Library 1');
    expect(lib.books.length).to.be.equal(1);

    expect(lib.books[0].title).to.be.equal('Book 1');
    expect(lib.books[0].chapters.length).to.be.equal(1);
    expect(lib.books[0].chapters[0].title).to.be.equal('Chapter 1');
    expect(lib.books[0].chapters[0].file).to.be.equal('http://test.local/mdc/chapter1.md');
  });

  it('parses library with one book and several chapters', function () {
    const parser = new LibraryParser();
    const lib = parser.parse(
      LibOneBookSeveralChapters,
      new FileLoader(),
      new PathMerger('http://test.local/mdc/')
    );

    expect(lib.name).to.be.equal('Library 1');
    expect(lib.books.length).to.be.equal(1);

    expect(lib.books[0].title).to.be.equal('Book 1');
    expect(lib.books[0].chapters.length).to.be.equal(4);
    expect(lib.books[0].chapters[0].title).to.be.equal('Chapter 1');
    expect(lib.books[0].chapters[0].file).to.be.equal('http://test.local/mdc/chapter1.md');
    expect(lib.books[0].chapters[1].title).to.be.equal('Chapter 2');
    expect(lib.books[0].chapters[1].file).to.be.equal('http://test.local/mdc/chapter2.md');
    expect(lib.books[0].chapters[2].title).to.be.equal('Chapter 3');
    expect(lib.books[0].chapters[2].file).to.be.equal('http://test.local/mdc/chapter3.md');
    expect(lib.books[0].chapters[3].title).to.be.equal('Chapter 4');
    expect(lib.books[0].chapters[3].file).to.be.equal('http://test.local/mdc/chapter4.md');
  });

  it('parses library with multiple books and several chapters', function () {
    const parser = new LibraryParser();
    const lib = parser.parse(
      LibMultipleBooks,
      new FileLoader(),
      new PathMerger('http://test.local/mdc/')
    );

    expect(lib.name).to.be.equal('Library 1');
    expect(lib.books.length).to.be.equal(3);

    expect(lib.books[0].title).to.be.equal('Book 1');
    expect(lib.books[0].chapters.length).to.be.equal(3);
    expect(lib.books[0].chapters[0].title).to.be.equal('Chapter 1');
    expect(lib.books[0].chapters[0].file).to.be.equal('http://test.local/mdc/book1/chapter1.md');

    expect(lib.books[1].title).to.be.equal('Book 2');
    expect(lib.books[1].chapters.length).to.be.equal(3);
    expect(lib.books[1].chapters[0].title).to.be.equal('Chapter 1');
    expect(lib.books[1].chapters[0].file).to.be.equal('http://test.local/mdc/book2/chapter1.md');

    expect(lib.books[2].title).to.be.equal('Book 3');
    expect(lib.books[2].chapters.length).to.be.equal(3);
    expect(lib.books[2].chapters[0].title).to.be.equal('Chapter 1');
    expect(lib.books[2].chapters[0].file).to.be.equal('http://test.local/book3/chapter1.md');
  });

  it('parses library with multiple books and merges duplicate books', function () {
    const parser = new LibraryParser();
    const lib = parser.parse(
      LibMultipleBooksWithDuplicate,
      new FileLoader(),
      new PathMerger('http://test.local/mdc/')
    );

    expect(lib.name).to.be.equal('Library 1');
    expect(lib.books.length).to.be.equal(3);

    expect(lib.books[0].title).to.be.equal('Book 1');
    expect(lib.books[0].chapters.length).to.be.equal(5);
    expect(lib.books[0].chapters[0].title).to.be.equal('Chapter 1');
    expect(lib.books[0].chapters[0].file).to.be.equal('http://test.local/mdc/book1/chapter1.md');
    expect(lib.books[0].chapters[4].title).to.be.equal('Chapter 5');
    expect(lib.books[0].chapters[4].file).to.be.equal('http://test.local/mdc/book1/chapter5.md');

    expect(lib.books[1].title).to.be.equal('Book 2');
    expect(lib.books[1].chapters.length).to.be.equal(3);
    expect(lib.books[1].chapters[0].title).to.be.equal('Chapter 1');
    expect(lib.books[1].chapters[0].file).to.be.equal('http://test.local/mdc/book2/chapter1.md');

    expect(lib.books[2].title).to.be.equal('Book 3');
    expect(lib.books[2].chapters.length).to.be.equal(3);
    expect(lib.books[2].chapters[0].title).to.be.equal('Chapter 1');
    expect(lib.books[2].chapters[0].file).to.be.equal('http://test.local/book3/chapter1.md');
  });
});

export const LibOnlyTitle = `# Library 1
There are no books or chapters here.
[useless link](/sth.md)`;

export const LibOneBook = `# Library 1
There are no books or chapters here.
[useless link](/sth.md)

## Book 1
[Chapter 1](./chapter1.md)`;

export const LibOneBookSeveralChapters = `# Library 1
There are no books or chapters here.
[useless link](/sth.md)

## Book 1
[Chapter 1](./chapter1.md) [Chapter 2](./chapter2.md)
- [Chapter 3](./chapter3.md)
- [Chapter 4](./chapter4.md)`;

export const LibMultipleBooks = `# Library 1
There are no books or chapters here.
[useless link](/sth.md)

## Book 1
- [Chapter 1](book1/chapter1.md)
- [Chapter 2](book1/chapter2.md)
- [Chapter 3](book1/chapter3.md)

## Book 2
- [Chapter 1](./book2/chapter1.md)
- [Chapter 2](./book2/chapter2.md)
- [Chapter 3](./book2/chapter3.md)

## Book 3
- [Chapter 1](/book3/chapter1.md)
- [Chapter 2](/book3/chapter2.md)
- [Chapter 3](/book3/chapter3.md)
`;

export const LibMultipleBooksWithDuplicate = `# Library 1
There are no books or chapters here.
[useless link](/sth.md)

## Book 1
- [Chapter 1](book1/chapter1.md)
- [Chapter 2](book1/chapter2.md)
- [Chapter 3](book1/chapter3.md)

## Book 2
- [Chapter 1](./book2/chapter1.md)
- [Chapter 2](./book2/chapter2.md)
- [Chapter 3](./book2/chapter3.md)

## Book 3
- [Chapter 1](/book3/chapter1.md)
- [Chapter 2](/book3/chapter2.md)
- [Chapter 3](/book3/chapter3.md)

## Book 1
- [Chapter 1](book1/chapter1.md)
- [Chapter 4](book1/chapter4.md)
- [Chapter 5](book1/chapter5.md)
`;
