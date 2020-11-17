import React from "react";
import "jest-styled-components";
import TestRenderer from "react-test-renderer";
import { assertStyleMatch } from "../../../../__spec_helper__/test-utils";
import StyledTickIcon from "./tick-icon.style";
import baseTheme from "../../../../style/themes/base";

function render(props) {
  return TestRenderer.create(<StyledTickIcon {...props} type="tick" />);
}

describe("StyledTickIcon", () => {
  let wrapper;

  describe("when checked", () => {
    it("changes property display to block", () => {
      wrapper = render({ checked: true, color: "#676767" });
      assertStyleMatch(
        {
          display: "block",
        },
        wrapper.toJSON()
      );
    });

    it("applies white icon on the dark background", () => {
      wrapper = render({ checked: true, color: "#000000" });
      assertStyleMatch(
        {
          color: baseTheme.colors.white,
        },
        wrapper.toJSON(),
        { modifier: "::before" }
      );
    });

    it("applies black icon on the light background", () => {
      wrapper = render({ checked: true, color: "#ffffff" });
      assertStyleMatch(
        {
          color: baseTheme.text.color,
        },
        wrapper.toJSON(),
        { modifier: "::before" }
      );
    });
  });
});
