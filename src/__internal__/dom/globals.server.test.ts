import { getWindow, getDocument, getNavigator } from "./globals";

describe("getWindow on server", () => {
  it("should return undefined if window does not exist", () => {
    expect(typeof window).toBe("undefined");
    expect(getWindow()).toBeUndefined();
  });
});

describe("getDocument on server", () => {
  it("should return undefined if document does not exist", () => {
    expect(typeof document).toBe("undefined");
    expect(getDocument()).toBeUndefined();
  });
});

describe("getNavigator on server", () => {
  it("should return whether the navigator exists", () => {
    // Node.js 21 introduced support for navigator, so it may or may not exist depending on the version of Node.js
    if (typeof navigator === "undefined") {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(getNavigator()).toBeUndefined();
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(getNavigator()).toBeDefined();
    }
  });
});
