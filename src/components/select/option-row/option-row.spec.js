import React from "react";
import TestRenderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import OptionRow from "./option-row.component";
import { baseTheme } from "../../../style/themes";

describe("OptionRow", () => {
  it("renders properly", () => {
    const props = { value: "1", text: "foo", children: "bar" };
    expect(renderOptionRow(props, TestRenderer.create)).toMatchSnapshot();
  });

  describe("when isHighlighted prop is set", () => {
    it("then it should have expected background", () => {
      const props = { value: "1", text: "foo", isHighlighted: true };
      expect(renderOptionRow(props, mount)).toHaveStyleRule(
        "background-color",
        baseTheme.select.selected
      );
    });
  });

  describe("when hidden prop is set", () => {
    it("then it should have display set to none", () => {
      const props = { value: "1", text: "foo", hidden: true };
      expect(renderOptionRow(props, mount)).toHaveStyleRule("display", "none");
    });
  });

  describe("when the element is hovered over", () => {
    it("then it should have expected background", () => {
      const props = { value: "1", text: "foo" };
      expect(renderOptionRow(props, mount)).toHaveStyleRule(
        "background-color",
        baseTheme.select.selected,
        { modifier: ":hover" }
      );
    });
  });

  describe("when the element is clicked", () => {
    it("then onSelect should be called with text and value", () => {
      const onSelect = jest.fn();
      const props = { value: "1", text: "foo", onSelect };
      const wrapper = renderOptionRow(props, mount);
      wrapper.simulate("click");

      expect(onSelect).toHaveBeenCalledWith({
        text: props.text,
        value: props.value,
      });
    });
  });
});

function renderOptionRow(props, renderer = shallow) {
  return renderer(<OptionRow {...props} />);
}
