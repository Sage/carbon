import React from "react";
import { mount, shallow } from "enzyme";

import SimpleColor, { SimpleColorProps } from "./simple-color.component";
import {
  StyledSimpleColorInput,
  StyledColorSampleBox,
  StyledTickIcon,
} from "./simple-color.style";
import { rootTagTest } from "../../../__internal__/utils/helpers/tags/tags-specs";
import { assertStyleMatch } from "../../../__spec_helper__/__internal__/test-utils";
import guid from "../../../__internal__/utils/helpers/guid";

const mockedGuid = "guid-12345";
jest.mock("../../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

function render(props?: SimpleColorProps) {
  return mount(<SimpleColor name="color-picker" value="#0073C2" {...props} />);
}

describe("ColorOption", () => {
  it("contains input and color sample box", () => {
    const wrapper = shallow(
      <SimpleColor name="color-picker" value="#0073C2" />
    );
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.find(StyledSimpleColorInput).exists()).toBeTruthy();
    expect(wrapper.find(StyledColorSampleBox).exists()).toBeTruthy();
  });

  describe("tags on component", () => {
    it("include correct component, element and role data tags", () => {
      const wrapper = shallow(
        <SimpleColor data-element="bar" data-role="baz" value="#0073C2" />
      );
      rootTagTest(wrapper, "simple-color", "bar", "baz");
    });
  });

  describe("when checked", () => {
    it("renders the tick icon", () => {
      const wrapper = render({ checked: true, value: "#676767" });
      const icon = wrapper.find(StyledTickIcon);
      expect(icon.exists()).toBeTruthy();
      expect(icon.props().type).toEqual("tick");
    });
  });

  it("applies passed value to the background-color", () => {
    const wrapper = render({ value: "#0073c2" });
    assertStyleMatch(
      {
        backgroundColor: "#0073c2",
      },
      wrapper.find(StyledColorSampleBox)
    );
  });

  it('applies transparent background when value "transparent" is given as color', () => {
    const wrapper = render({ value: "transparent" });
    assertStyleMatch(
      {
        backgroundColor: "#eeeeee",
        backgroundImage: "url(checker-board.svg)",
        backgroundSize: "14px 14px",
        backgroundPosition: "-2px -2px",
      },
      wrapper.find(StyledColorSampleBox)
    );
  });

  it("applies white icon on the dark background", () => {
    const wrapper = render({ checked: true, value: "#000000" });
    assertStyleMatch(
      {
        color: "var(--colorsUtilityYang100)",
      },
      wrapper.find(StyledTickIcon),
      { modifier: "::before" }
    );
  });

  it("applies black icon on the light background", () => {
    const wrapper = render({ checked: true, value: "#ffffff" });
    assertStyleMatch(
      {
        color: "var(--colorsUtilityYin090)",
      },
      wrapper.find(StyledTickIcon),
      { modifier: "::before" }
    );
  });

  it("assigns unique id to an input element when id prop is not passed", () => {
    const wrapper = render();
    expect(wrapper.find("input").getDOMNode().id).toEqual(mockedGuid);
  });
});
