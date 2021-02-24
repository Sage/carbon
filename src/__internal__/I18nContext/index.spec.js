import I18nContext from "./index";

jest.mock("react", () => ({
  createContext: jest.fn((callback) => callback),
}));

describe("I18nContext", () => {
  it("when no I18nProvider exists should throw an error", () => {
    try {
      I18nContext();
    } catch (error) {
      expect(error.message).toBe("No I18nProvider exists.");
    }
  });
});
