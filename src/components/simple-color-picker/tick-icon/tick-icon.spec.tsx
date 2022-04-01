import React from "react";
import { mount } from "enzyme";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StyledTickIcon, { TickIconProps } from "./tick-icon.style";

function render(props: TickIconProps) {
  return mount(<StyledTickIcon {...props} />);
}

describe("When StyledTickIcon is checked", () => {
  let wrapper;

  it("changes property display to block", () => {
    wrapper = render({ checked: true, color: "#676767", type: "tick" });
    assertStyleMatch(
      {
        display: "block",
      },
      wrapper
    );
  });

  it("applies white icon on the dark background", () => {
    wrapper = render({ checked: true, color: "#000000", type: "tick" });
    assertStyleMatch(
      {
        color: "var(--colorsUtilityYang100)",
      },
      wrapper,
      { modifier: "::before" }
    );
  });

  it("applies black icon on the light background", () => {
    wrapper = render({ checked: true, color: "#ffffff", type: "tick" });
    assertStyleMatch(
      {
        color: "var(--colorsUtilityYin090)",
      },
      wrapper,
      { modifier: "::before" }
    );
  });
});
