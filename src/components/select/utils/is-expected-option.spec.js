import React from "react";
import Option from "../option/option.component";
import isExpectedOption from "./is-expected-option";

describe("isExpectedOption", () => {
  describe("when the element is not an Option", () => {
    it("then it should return false", () => {
      const element = <div>mock</div>;
      const expectedValue = "foo";

      expect(isExpectedOption(element, expectedValue)).toBe(false);
    });
  });

  describe("when the element is an Option", () => {
    describe("and it's value prop is a string", () => {
      describe("with the same content as the second argument", () => {
        it("then it should return true", () => {
          const element = <Option value="foo" text="bar" />;
          const expectedValue = "foo";

          expect(isExpectedOption(element, expectedValue)).toBe(true);
        });
      });

      describe("with the different content than the second argument", () => {
        it("then it should return false", () => {
          const element = <Option value="foo" text="bar" />;
          const expectedValue = "bar";

          expect(isExpectedOption(element, expectedValue)).toBe(false);
        });
      });
    });

    describe("and it's value prop is an object", () => {
      describe("with the same id prop as the second argument's id", () => {
        it("then it should return true", () => {
          const element = (
            <Option text="bar" value={{ id: "foo", value: "foo" }} />
          );
          const expectedValue = { id: "foo", value: "foo" };

          expect(isExpectedOption(element, expectedValue)).toBe(true);
        });
      });

      describe("with different id prop than the second argument's id", () => {
        it("then it should return false", () => {
          const element = (
            <Option text="bar" value={{ id: "foo", value: "foo" }} />
          );
          const expectedValue = { id: "bar", value: "foo" };

          expect(isExpectedOption(element, expectedValue)).toBe(false);
        });
      });
    });
  });

  describe.each([
    ["`null`", null],
    ["`undefined`", undefined],
    ["`empty string`", ""],
    ["`empty object`", {}],
  ])("when expectedValue is %s", (_, expectedValue) => {
    it("then it should return false", () => {
      const element = <Option text="bar" value={{ id: "foo", value: "foo" }} />;

      expect(isExpectedOption(element, expectedValue)).toBe(false);
    });
  });
});
