import React from "react";
import TestRenderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import Option, { OptionProps } from ".";
import SelectListContext from "../__internal__/select-list-context";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderOption(props: OptionProps, renderer: any = shallow) {
  return renderer(<Option {...props} />);
}

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

  describe("when disabled prop is set", () => {
    it("should have expected style", () => {
      const props = { value: "1", text: "foo", disabled: true };
      expect(renderOption(props, mount)).toHaveStyleRule(
        "color",
        "var(--colorsUtilityYin030)"
      );
      expect(renderOption(props, mount)).toHaveStyleRule(
        "cursor",
        "not-allowed"
      );
    });

    it("aria-disabled should be set to true", () => {
      const props = { value: "1", text: "foo", disabled: true };
      const wrapper = renderOption(props, mount);
      expect(wrapper.getDOMNode().getAttribute("aria-disabled")).toBe("true");
    });

    it("onSelect should not be called when the element is clicked", () => {
      const onSelect = jest.fn();
      const props = { value: "1", text: "foo", onSelect, disabled: true };
      const wrapper = renderOption(props, mount);
      wrapper.simulate("click");

      expect(onSelect).not.toBeCalled();
    });
  });

  describe("when the element is inside the multiselect", () => {
    it("then it should have expected background", () => {
      const props = { value: "1", text: "foo" };
      expect(renderOption(props, mount)).toHaveStyleRule(
        "background-color",
        "var(--colorsUtilityMajor100)",
        { modifier: ":hover" }
      );
    });
  });

  describe("when the multiselectValues list contains the element value", () => {
    it("then the aria-selected attribute should be set to true", () => {
      const wrapper = mount(
        <SelectListContext.Provider value={{ multiselectValues: ["1"] }}>
          <Option value="1" text="foo" />
        </SelectListContext.Provider>
      );
      expect(wrapper.getDOMNode().getAttribute("aria-selected")).toBe("true");
    });
  });

  describe("when the multiselectValues list is present but does not contain the element value", () => {
    it("then the aria-selected attribute should be set to false", () => {
      const wrapper = mount(
        <SelectListContext.Provider value={{ multiselectValues: ["1", "2"] }}>
          <Option value="3" text="foo" />
        </SelectListContext.Provider>
      );
      expect(wrapper.getDOMNode().getAttribute("aria-selected")).toBe("false");
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

  describe("tags on component", () => {
    it("includes correct component, element and role data tags", () => {
      const wrapper = mount(
        <Option
          value="1"
          text="one"
          data-component="foo"
          data-element="bar"
          data-role="baz"
        />
      );

      expect(wrapper.getDOMNode().getAttribute("data-component")).toEqual(
        "foo"
      );
      expect(wrapper.getDOMNode().getAttribute("data-element")).toEqual("bar");
      expect(wrapper.getDOMNode().getAttribute("data-role")).toEqual("baz");
    });
  });
});
