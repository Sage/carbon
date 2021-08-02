import Helper from "./validations";

describe("Validations Helper", () => {
  describe("Comparison Type", () => {
    describe("when params contains is", () => {
      it("returns Exact", () => {
        expect(Helper.comparisonType({ is: "foo" })).toEqual("Exact");
        expect(Helper.comparisonType({ is: 0 })).toEqual("Exact");
      });
    });

    describe("when params contains max", () => {
      it("returns Less", () => {
        expect(Helper.comparisonType({ max: 2 })).toEqual("Less");
        expect(Helper.comparisonType({ max: 0 })).toEqual("Less");
      });
    });

    describe("when params contains min", () => {
      it("returns Greater", () => {
        expect(Helper.comparisonType({ min: 2 })).toEqual("Greater");
        expect(Helper.comparisonType({ min: 0 })).toEqual("Greater");
      });
    });

    describe("when params contains max and min", () => {
      it("returns Range", () => {
        expect(Helper.comparisonType({ min: 1, max: 2 })).toEqual("Range");
        expect(Helper.comparisonType({ min: 0, max: 0 })).toEqual("Range");
      });
    });

    describe("when params is empty", () => {
      it("throws an error", () => {
        expect(Helper.comparisonType({})).toBeNull();
      });
    });
  });
});
