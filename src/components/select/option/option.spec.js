import React from "react";
import TestRenderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import Option from "./option.component";

describe("Option", () => {
  it("renders properly", () => {
    const props = { value: "1", text: "foo", children: "bar" };
    expect(renderOption(props, TestRenderer.create)).toMatchSnapshot();
  });

  describe("when no children are provided", () => {
    it("renders with the text prop as children", () => {
      const props = { value: "1", text: "foo" };
      expect(renderOption(props, TestRenderer.create)).toMatchSnapshot();
    });
  });

  describe("when isHighlighted prop is set", () => {
    it("then it should have expected background", () => {
      const props = { value: "1", text: "foo", isHighlighted: true };
      expect(renderOption(props, mount)).toHaveStyleRule(
        "background-color",
        "var(--colorsUtilityMajor200)"
      );
    });
  });

  describe("when hidden prop is set", () => {
    it("then it should have display set to none", () => {
      const props = { value: "1", text: "foo", hidden: true };
      expect(renderOption(props, mount)).toHaveStyleRule("display", "none");
    });
  });

  describe("when the element is hovered over", () => {
    it("then it should have expected background", () => {
      const props = { value: "1", text: "foo" };
      expect(renderOption(props, mount)).toHaveStyleRule(
        "background-color",
        "var(--colorsUtilityMajor200)",
        { modifier: ":hover" }
      );
    });
  });

  describe("when the element is clicked", () => {
    it("then onSelect should be called with text and value", () => {
      const onSelect = jest.fn();
      const props = { value: "1", text: "foo", onSelect };
      const wrapper = renderOption(props, mount);
      wrapper.simulate("click");

      expect(onSelect).toHaveBeenCalledWith({
        text: props.text,
        value: props.value,
      });
    });
  });
});

function renderOption(props, renderer = shallow) {
  return renderer(<Option {...props} />);
}
