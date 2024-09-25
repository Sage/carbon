import browserCheck, { isSafari } from ".";

describe("browserTypeCheck", () => {
  test('returns true when the "chrome" property is present in the browser object', () => {
    const browser = { chrome: { foo: true }, sidebar: undefined };
    const result = browserCheck(browser);
    expect(result).toEqual(true);
  });
  test('returns true when the "sidebar" property is present in the browser object', () => {
    const browser = { chrome: undefined, sidebar: { foo: true } };
    const result = browserCheck(browser);
    expect(result).toEqual(true);
  });
  test('returns true when the "chrome" and "sidebar" properties are present in the browser object', () => {
    const browser = { chrome: { foo: true }, sidebar: { foo: true } };
    const result = browserCheck(browser);
    expect(result).toEqual(true);
  });
  test('returns false when the "chrome" and "sidebar" properties are not present in the browser object', () => {
    const browser = {};
    const result = browserCheck(browser);
    expect(result).toEqual(false);
  });
});

describe("isSafari", () => {
  test('returns true when the vendor string contains "Apple"', () => {
    const navigator = { vendor: "Apple" } as Navigator;
    const result = isSafari(navigator);
    expect(result).toEqual(true);
  });
  test('returns false when the vendor string does not contain "Apple"', () => {
    const navigator = { vendor: "foo" } as Navigator;
    const result = isSafari(navigator);
    expect(result).toEqual(false);
  });
});
