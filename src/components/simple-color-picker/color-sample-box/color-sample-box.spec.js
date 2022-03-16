import React from "react";
import { shallow, mount } from "enzyme";

import ColorSampleBox from ".";
import StyledColorSampleBox from "./color-sample-box.style";
import {
  assertStyleMatch,
  expectConsoleOutput as expectError,
} from "../../../__spec_helper__/test-utils";
import StyledTickIcon from "../tick-icon/tick-icon.style";

function render(props) {
  return shallow(<ColorSampleBox {...props} />);
}

function renderStyles(props) {
  return mount(<StyledColorSampleBox {...props} />);
}

describe("ColorSampleBox", () => {
  let wrapper;

  it("applies passed color to the background-color", () => {
    wrapper = renderStyles({ color: "#0073c2" });
    assertStyleMatch(
      {
        backgroundColor: "#0073c2",
      },
      wrapper
    );
  });

  it('applies transparent background when value "transparent" is given as color', () => {
    wrapper = renderStyles({ color: "transparent" });
    assertStyleMatch(
      {
        backgroundColor: "#eeeeee",
        backgroundImage: "url()",
        backgroundSize: "14px 14px",
        backgroundPosition: "-2px -2px",
      },
      wrapper
    );
  });

  describe("prop types", () => {
    const wrongColorValues = ["rgb(0,0,0)", "#fff", "test"];

    describe.each(wrongColorValues)(
      "when other than 6 digit hex format is passed",
      (color) => {
        it("throws an error", () => {
          // this prevents the caching of the error message
          ColorSampleBox.displayName = color;

          const errorMessage = `Warning: Failed prop type: Provide color in a six-digit hex format or 'transparent' in ${color}.`;

          const assert = expectError(errorMessage);

          render({ checked: true, color });
          assert();
        });
      }
    );
  });

  describe("when checked", () => {
    it("renders the tick icon", () => {
      wrapper = render({ checked: true, color: "#676767" });
      const icon = wrapper.find(StyledTickIcon);
      expect(icon.exists()).toBeTruthy();
      expect(icon.props().type).toEqual("tick");
    });
  });
});
