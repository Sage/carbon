import React from "react";
import TestRenderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import OptionRow, { OptionRowProps } from "./option-row.component";
import SelectListContext from "../__internal__/select-list-context";

function renderOptionRow(
  props: Omit<OptionRowProps, "id" | "children">,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer: any = shallow
) {
  return renderer(
    <table>
      <tbody>
        <OptionRow id="1" {...props}>
          <td>foo</td>
        </OptionRow>
      </tbody>
    </table>
  );
}

describe("OptionRow", () => {
  it("renders properly", () => {
    const props = { id: "1", value: "1", text: "foo", children: "bar" };
    expect(renderOptionRow(props, TestRenderer.create)).toMatchSnapshot();
  });

  describe("when isHighlighted prop is set", () => {
    it("then it should have expected background", () => {
      const props = { value: "1", text: "foo", isHighlighted: true };
      expect(renderOptionRow(props, mount)).toHaveStyleRule(
        "background-color",
        "var(--colorsUtilityMajor200)"
      );
    });
  });

  describe("when hidden prop is set", () => {
    it("then it should have display set to none", () => {
      const props = { value: "1", text: "foo", hidden: true };
      expect(renderOptionRow(props, mount)).toHaveStyleRule("display", "none");
    });
  });

  describe("when the multiselectValues list contains the element value", () => {
    it("then the aria-selected attribute should be set to true", () => {
      const wrapper = mount(
        <SelectListContext.Provider value={{ multiselectValues: ["1"] }}>
          <OptionRow id="1" value="1" text="foo">
            <td>foo</td>
          </OptionRow>
        </SelectListContext.Provider>
      );
      expect(wrapper.getDOMNode().getAttribute("aria-selected")).toBe("true");
      wrapper.unmount();
    });
  });

  describe("when the multiselectValues list does not contain the element value", () => {
    it("then the aria-selected attribute should be set to false", () => {
      const wrapper = mount(
        <SelectListContext.Provider value={{ multiselectValues: ["1", "2"] }}>
          <OptionRow id="3" value="3" text="foo">
            <td>foo</td>
          </OptionRow>
        </SelectListContext.Provider>
      );
      expect(wrapper.getDOMNode().getAttribute("aria-selected")).toBe("false");
      wrapper.unmount();
    });
  });

  describe("when the element is hovered over", () => {
    it("then it should have expected background", () => {
      const props = { value: "1", text: "foo" };
      expect(renderOptionRow(props, mount)).toHaveStyleRule(
        "background-color",
        "var(--colorsUtilityMajor100)",
        { modifier: ":hover" }
      );
    });
  });

  describe("when the element is clicked", () => {
    it("then onSelect should be called with text and value", () => {
      const onSelect = jest.fn();
      const props = { id: "1", value: "1", text: "foo", onSelect };
      const wrapper = renderOptionRow(props, mount);
      wrapper.find(OptionRow).simulate("click");

      expect(onSelect).toHaveBeenCalledWith({
        id: props.id,
        text: props.text,
        value: props.value,
      });
    });
  });

  describe("tags on component", () => {
    it("includes correct component, element and role data tags", () => {
      const wrapper = mount(
        <OptionRow
          value="1"
          text="one"
          data-component="foo"
          data-element="bar"
          data-role="baz"
        >
          <td>qux</td>
        </OptionRow>
      );

      expect(wrapper.getDOMNode().getAttribute("data-component")).toEqual(
        "foo"
      );
      expect(wrapper.getDOMNode().getAttribute("data-element")).toEqual("bar");
      expect(wrapper.getDOMNode().getAttribute("data-role")).toEqual("baz");
    });
  });
});
