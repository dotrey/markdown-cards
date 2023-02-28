import { describe, expect, it } from 'vitest';
import { PathMerger } from './PathMerger';

describe('Path Merge', function () {
  it('merge relative path', function () {
    const merger = new PathMerger('http://test.local');

    expect(merger.merge('a.md')).to.be.equal('http://test.local/a.md');
    expect(merger.merge('./a.md')).to.be.equal('http://test.local/a.md');
    expect(merger.merge('./sub/a.md')).to.be.equal('http://test.local/sub/a.md');
    expect(merger.merge('sub/a.md')).to.be.equal('http://test.local/sub/a.md');
  });

  it('merge relative path in sub folder', function () {
    const merger = new PathMerger('http://test.local/demo/');

    expect(merger.merge('a.md')).to.be.equal('http://test.local/demo/a.md');
    expect(merger.merge('./a.md')).to.be.equal('http://test.local/demo/a.md');
    expect(merger.merge('./sub/a.md')).to.be.equal('http://test.local/demo/sub/a.md');
    expect(merger.merge('sub/a.md')).to.be.equal('http://test.local/demo/sub/a.md');
    expect(merger.merge('../sub/a.md')).to.be.equal('http://test.local/sub/a.md');
  });

  it('merge absolute path', function () {
    const merger = new PathMerger('http://test.local');

    expect(merger.merge('/a.md')).to.be.equal('http://test.local/a.md');
    expect(merger.merge('/sub/a.md')).to.be.equal('http://test.local/sub/a.md');
  });

  it('merge absolute path in sub folder', function () {
    const merger = new PathMerger('http://test.local/demo/');

    expect(merger.merge('/a.md')).to.be.equal('http://test.local/a.md');
    expect(merger.merge('/sub/a.md')).to.be.equal('http://test.local/sub/a.md');
  });

  it('merge relative path to max top level', function () {
    const merger = new PathMerger('http://test.local/demo/');

    expect(merger.merge('../../../../a.md')).to.be.equal('http://test.local/a.md');
  });
});
