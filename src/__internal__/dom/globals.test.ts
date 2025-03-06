import { getWindow, getDocument, getNavigator } from "./globals";

describe("getWindow", () => {
  it("should return the window object if it exists", () => {
    expect(window).toBeDefined();
    expect(getWindow()).toBe(window);
  });
});

describe("getDocument", () => {
  it("should return the document object if it exists", () => {
    expect(document).toBeDefined();
    expect(getDocument()).toBe(document);
  });
});

describe("getNavigator", () => {
  it("should return the navigator object if it exists", () => {
    expect(navigator).toBeDefined();
    expect(getNavigator()).toBe(navigator);
  });
});
