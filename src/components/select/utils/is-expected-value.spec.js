import isExpectedValue from "./is-expected-value";

describe("isExpectedOption", () => {
  describe("when the currentValue is a string", () => {
    describe("with the same content as the second argument", () => {
      it("then it should return true", () => {
        const currentValue = "foo";
        const expectedValue = "foo";

        expect(isExpectedValue(currentValue, expectedValue)).toBe(true);
      });
    });

    describe("with the different content than the second argument", () => {
      it("then it should return false", () => {
        const currentValue = "foo";
        const expectedValue = "bar";

        expect(isExpectedValue(currentValue, expectedValue)).toBe(false);
      });
    });
  });

  describe("when the currentValue is an object", () => {
    describe("with the same id prop as the second argument's id", () => {
      it("then it should return true", () => {
        const currentValue = { id: "foo", value: "foo" };
        const expectedValue = { id: "foo", value: "foo" };

        expect(isExpectedValue(currentValue, expectedValue)).toBe(true);
      });
    });

    describe("with different id prop than the second argument's id", () => {
      it("then it should return false", () => {
        const currentValue = { id: "foo", value: "foo" };
        const expectedValue = { id: "bar", value: "foo" };

        expect(isExpectedValue(currentValue, expectedValue)).toBe(false);
      });
    });
  });
});
