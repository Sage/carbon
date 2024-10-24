import filterObjectProperties from ".";

const allProps = {
  boolProp: true,
  stringProp: "string",
  anotherBoolProp: false,
  objectProp: { a: true },
};

const keyList = ["boolProp", "stringProp", "objectProp"];

describe("filterObjectProperties", () => {
  describe("when filterObjectProperties method is called with an object and keyList", () => {
    it("then an object containing only keyList keys should be returned", () => {
      const expectedProps = {
        boolProp: true,
        stringProp: "string",
        objectProp: { a: true },
      };

      expect(filterObjectProperties(allProps, keyList)).toEqual(expectedProps);
    });
  });
});
