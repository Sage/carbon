import browserCheck from '.';

describe('browserTypeCheck', () => {
  it('returns true if "chrome" is true', () => {
    const _window = { chrome: true, sidebar: false };
    expect(browserCheck(_window)).toEqual(true);
  });
  it('returns true if "sidebar" is true', () => {
    const _window = { chrome: false, sidebar: true };
    expect(browserCheck(_window)).toEqual(true);
  });
  it('returns true if "chrome" and "sidebar" is true', () => {
    const _window = { chrome: true, sidebar: true };
    expect(browserCheck(_window)).toEqual(true);
  });
  it('returns false if neither "chrome" or "sidebar" is true', () => {
    const _window = { chrome: false, sidebar: false };
    expect(browserCheck(_window)).toEqual(false);
  });
});
