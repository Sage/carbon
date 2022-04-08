import Browser from ".";

describe("Browser", () => {
  describe("isDomAvailable", () => {
    it("returns the true when window object is defined", () => {
      expect(Browser.isDomAvailable()).toBe(true);
    });

    it("returns false when window is undefined", () => {
      const { getWindow } = Browser;
      Browser.getWindow = jest.fn(() => undefined);
      expect(Browser.isDomAvailable()).toBe(false);
      Browser.getWindow = getWindow;
    });

    it("returns false when document is undefined", () => {
      const { getDocument } = Browser;
      Browser.getDocument = jest.fn(() => undefined);
      expect(Browser.isDomAvailable()).toBe(false);
      Browser.getDocument = getDocument;
    });

    it("returns false when document.createElement does not exist", () => {
      const { getDocument } = Browser;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Browser.getDocument as jest.MockedFunction<any>) = jest.fn(() => ({
        createElement: undefined,
      }));
      expect(Browser.isDomAvailable()).toEqual(false);
      Browser.getDocument = getDocument;
    });
  });

  describe("getWindow", () => {
    it("returns the window object", () => {
      expect(Browser.getWindow()).toEqual(window);
    });
  });

  describe("getDocument", () => {
    it("returns the document object", () => {
      expect(Browser.getDocument()).toEqual(document);
    });
  });
});
