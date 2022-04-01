import React from "react";
import { shallow, mount } from "enzyme";

import ColorSampleBox from ".";
import StyledColorSampleBox from "./color-sample-box.style";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StyledTickIcon, { TickIconProps } from "../tick-icon/tick-icon.style";

function render(props: Pick<TickIconProps, "color" | "checked">) {
  return shallow(<ColorSampleBox {...props} />);
}

function renderStyles(props: Pick<TickIconProps, "color">) {
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

  describe.each(["rgb(0,0,0)", "#fff", "test"])(
    "when `color` value other than 6 digit hex format is passed",
    (color) => {
      it("throws an error", () => {
        // this prevents the caching of the error message
        ColorSampleBox.displayName = color;

        const errorMessage = `Provide color in a six-digit hex format or 'transparent' in ${color}.`;

        const mockGlobal = jest
          .spyOn(global.console, "error")
          .mockImplementation(() => undefined);

        expect(() => {
          render({ checked: true, color });
        }).toThrow(errorMessage);

        mockGlobal.mockReset();
      });
    }
  );

  describe("when checked", () => {
    it("renders the tick icon", () => {
      wrapper = render({ checked: true, color: "#676767" });
      const icon = wrapper.find(StyledTickIcon);
      expect(icon.exists()).toBeTruthy();
      expect(icon.props().type).toEqual("tick");
    });
  });
});
