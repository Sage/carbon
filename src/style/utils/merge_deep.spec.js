import { mergeDeep } from './merge_deep';

describe('mergeDeep', () => {
  let base;

  beforeEach(() => {
    base = {
      a: 1, b: { nestedB: 1 }
    };
  });

  const toMerge = {
    a: 1, b: { nestedA: 1 }
  };

  it('merges objects with nested keys', () => {
    expect(mergeDeep(base, toMerge)).toEqual({ a: 1, b: { nestedA: 1, nestedB: 1 } });
  });

  it('merges the objects and creates a new key', () => {
    const newKeyObj = { a: 1, b: { nestedB: 1 }, c: 'test' };
    expect(mergeDeep(base, newKeyObj)).toEqual({ a: 1, b: { nestedB: 1 }, c: 'test' });
  });

  it('merges the objects but does not create a new key when not passed an object', () => {
    expect(mergeDeep(base, undefined)).toEqual(base);
  });
});
