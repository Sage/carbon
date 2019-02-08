import { mergeDeep } from './merge_deep';

describe('mergeDeep', () => {
  const base = {
    a: 1, b: { nestedB: 1 }
  }

  const toMerge = {
    a: 1, b: { nestedA: 1 }
  };

  it('merges objects with nested keys', () => {
    expect(mergeDeep(base, toMerge)).toEqual({ a: 1, b: { nestedA: 1, nestedB: 1 } });
  });
});