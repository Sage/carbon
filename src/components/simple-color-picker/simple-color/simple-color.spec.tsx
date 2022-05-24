import React from "react";
import { shallow } from "enzyme";
import SimpleColor, { SimpleColorProps } from "./simple-color.component";
import StyledSimpleColorInput from "../simple-color-input/simple-color-input.style";
import ColorSampleBox from "../color-sample-box";
import { rootTagTest } from "../../../__internal__/utils/helpers/tags/tags-specs";

function render(props?: SimpleColorProps) {
  return shallow(
    <SimpleColor name="color-picker" value="#0073C2" {...props} />
  );
}

describe("ColorOption", () => {
  let wrapper;

  it("contains input and color sample box", () => {
    wrapper = render();
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.find(StyledSimpleColorInput).exists()).toBeTruthy();
    expect(wrapper.find(ColorSampleBox).exists()).toBeTruthy();
  });

  describe("tags on component", () => {
    it("include correct component, element and role data tags", () => {
      wrapper = render({
        "data-element": "bar",
        "data-role": "baz",
        value: "#0073C2",
      });
      rootTagTest(wrapper, "simple-color", "bar", "baz");
    });
  });
});
