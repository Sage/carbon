import browserCheck, { isSafari } from ".";

describe("browserTypeCheck", () => {
  it('returns true if "chrome" exists', () => {
    const _window = { chrome: { foo: true }, sidebar: undefined };
    expect(browserCheck(_window)).toEqual(true);
  });
  it('returns true if "sidebar" exists', () => {
    const _window = { chrome: undefined, sidebar: { foo: true } };
    expect(browserCheck(_window)).toEqual(true);
  });
  it('returns true if "chrome" and "sidebar" exist', () => {
    const _window = { chrome: { foo: true }, sidebar: { foo: true } };
    expect(browserCheck(_window)).toEqual(true);
  });
  it('returns false if neither "chrome" or "sidebar" exists', () => {
    const _window = {};
    expect(browserCheck(_window)).toEqual(false);
  });
});

describe("isSafari", () => {
  it('returns true if vendor includes "Apple"', () => {
    const navigator = { vendor: "Apple" };
    expect(isSafari(navigator as Navigator)).toEqual(true);
  });
  it('returns false if vendor does not include "Apple"', () => {
    const navigator = { vendor: "foo" };
    expect(isSafari(navigator as Navigator)).toEqual(false);
  });
});
