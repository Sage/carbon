import React from "react";
import PropTypes from "prop-types";
import { validProps } from "./ether.js";

describe("Ether", () => {
  describe("validProps", () => {
    class Foo extends React.Component {
      static safeProps = ["foo"];

      render() {
        return <div foo={this.props.foo} bar={this.props.bar} />;
      }
    }

    Foo.propTypes = {
      foo: PropTypes.bool,
      bar: PropTypes.bool,
    };

    const instance = new Foo({
      foo: "foo",
      bar: "bar",
      quux: "quux",
    });

    it("returns the props that are NOT in the propTypes of the instance AND any props listed in safeProps", () => {
      const result = validProps(instance);

      expect(result).toEqual({ foo: "foo", quux: "quux" });
    });

    it("returns the props that are NOT in the propTypes of the instance AND any props passed as the second argument", () => {
      const result = validProps(instance, ["bar"]);

      // Note that the instance safeProps (foo) are not included
      expect(result).toEqual({
        bar: "bar",
        quux: "quux",
      });
    });
  });
});
