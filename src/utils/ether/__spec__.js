import {
  append,
  styleElement,
  acronymize,
  validProps,
  insertAt,
} from "./ether.js";
import React from "react";
import PropTypes from "prop-types";
import TestUtils from "react-dom/test-utils";
import Pod from "../../components/pod";

class Comp extends React.Component {
  render() {
    return <div className={this.props.className} />;
  }
}

describe("Ether", () => {
  let element;

  beforeEach(() => {
    element = TestUtils.renderIntoDocument(<Comp className="ether-test" />);
  });

  describe("styleElement", () => {
    it("sets the attribute style to the passed in value", () => {
      let domInstance = TestUtils.findRenderedDOMComponentWithClass(
        element,
        "ether-test"
      );
      expect(domInstance.style.left).toEqual("");
      styleElement(domInstance, "left", "10px");
      expect(domInstance.style.left).toEqual("10px");
    });

    describe("when the style attribute is already set to the passed in value", () => {
      it("does not change the attribute style", () => {
        let domInstance = TestUtils.findRenderedDOMComponentWithClass(
          element,
          "ether-test"
        );
        expect(domInstance.style.left).toEqual("");
        styleElement(domInstance, "left", "");
        expect(domInstance.style.left).toEqual("");
      });
    });
  });

  describe("append", () => {
    it("returns a string value with px appended", () => {
      expect(append(20, "px")).toEqual("20px");
      expect(append("20", "%")).toEqual("20%");
    });
  });

  describe("acronymize", () => {
    it("creates an acronym", () => {
      expect(acronymize("Foo bar Baz")).toEqual("FbB");
    });

    it("does not throw an error if an empty string", () => {
      expect(acronymize("")).toEqual("");
    });

    it("does not throw an error if there are no letters", () => {
      expect(acronymize("    ")).toEqual("");
    });

    it("does not throw an error if undefined is passed", () => {
      expect(acronymize(undefined)).toEqual("");
    });
  });

  describe("validProps", () => {
    class Foo extends React.Component {
      static propTypes = {
        foo: PropTypes.bool,
        bar: PropTypes.bool,
      };

      static safeProps = ["foo"];

      render() {
        return <div />;
      }
    }

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

  describe("insertAt", () => {
    describe("default separator", () => {
      it("returns a string formatted with dashes", () => {
        expect(insertAt("123456", { insertionIndices: [2, 5] })).toEqual(
          "12-34-56"
        );
      });
    });

    describe("custom separator", () => {
      it("returns a string formatted with the separator", () => {
        expect(
          insertAt("1234567890", { insertionIndices: [3, 7], separator: "/" })
        ).toEqual("123/456/7890");
      });
    });

    describe("when the insertion index is beyond the value length", () => {
      it("ignores the invalid index", () => {
        expect(
          insertAt("1234567890", {
            insertionIndices: [3, 7, 15],
            separator: "/",
          })
        ).toEqual("123/456/7890");
      });
    });
  });
});
