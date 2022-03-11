import PropTypes from "prop-types";
import { validProps } from ".";

describe("Ether", () => {
  describe("validProps", () => {
    it("returns the props that are NOT in the propTypes of the instance AND any props listed in safeProps", () => {
      const result = validProps({
        propTypes: {
          foo: PropTypes.bool,
          bar: PropTypes.bool,
        },
        props: {
          foo: "foo",
          bar: "bar",
          quux: "quux",
        },
        safeProps: ["foo"],
      });

      expect(result).toEqual({ foo: "foo", quux: "quux" });
    });

    it("returns the props that are NOT in the propTypes of the instance AND any props passed as the second argument", () => {
      const result = validProps(
        {
          propTypes: {
            foo: PropTypes.bool,
            bar: PropTypes.bool,
          },
          props: {
            foo: "foo",
            bar: "bar",
            quux: "quux",
          },
          safeProps: ["foo"],
        },
        ["bar"]
      );

      // Note that the instance safeProps (foo) are not included
      expect(result).toEqual({
        bar: "bar",
        quux: "quux",
      });
    });
  });
});
