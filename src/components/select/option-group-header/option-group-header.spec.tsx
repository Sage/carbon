import React from "react";
import TestRenderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import OptionGroupHeader, { OptionGroupHeaderProps } from ".";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderOption(props: OptionGroupHeaderProps, renderer: any = shallow) {
  return renderer(<OptionGroupHeader {...props} />);
}

describe("OptionGroupHeader", () => {
  it("renders properly", () => {
    const props = { label: "Heading" };
    expect(renderOption(props, TestRenderer.create)).toMatchSnapshot();
  });

  describe("when icon prop is set", () => {
    it("then it should display the icon", () => {
      const props = { label: "Heading", icon: "individual" as const };
      expect(renderOption(props, TestRenderer.create)).toMatchSnapshot();
    });
  });

  describe("tags on component", () => {
    it("includes correct component, element and role data tags", () => {
      const wrapper = mount(
        <OptionGroupHeader
          label="Heading"
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
