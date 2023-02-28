import { describe, expect, it } from 'vitest';
import { FileLoader } from './FileLoader';
import * as fs from 'node:fs/promises';
import { LibraryLoader } from './LibraryLoader';
import { PathMerger } from '../utility/PathMerger';

describe('Library Loader', function () {
  it('loads an index file', async function () {
    const loader = new LibraryLoader(new LocalFileLoader(), new PathMerger('https://localhost'));

    const lib = await loader.load('./test/index.md');
    expect(lib.books.length).to.be.equal(3);
    expect(lib.books[0].title).to.be.equal('Book 1');
    expect(lib.books[1].title).to.be.equal('Book 2');
    expect(lib.books[2].title).to.be.equal('Book 3');
    expect(lib.name).to.be.equal('Test Cards');
  });
});

// Note: the "fs" file system is used because I couldn't get "fetch()" to work
class LocalFileLoader extends FileLoader {
  async load(file: string) {
    const content = await fs.readFile(file).then((buffer) => {
      return buffer.toString();
    });
    return content;
  }
}
