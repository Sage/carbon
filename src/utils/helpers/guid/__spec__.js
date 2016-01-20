import guid from './guid';

describe('guid', () => {
  it('returns a 36 character id', () => {
    expect(guid().length).toEqual(36);
  });

  it('returns a unique id', () => {
    let id = guid();
    expect(guid()).not.toEqual(id);
  });
});
