import { mount } from "enzyme";
import React from "react";
import { baseTheme } from "../../../style/themes";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import InternalButtonIcon from "./InternalButtonIcon.component";

describe("InternalButtonIcon", () => {
  let wrapper;

  it.each([
    ["primary", baseTheme.colors.white],
    ["secondary", baseTheme.colors.primary],
  ])("should render correct color if %s prop provided", (a, expected) => {
    wrapper = mount(<InternalButtonIcon type="message" buttonType={a} />);

    assertStyleMatch(
      {
        color: expected,
      },
      wrapper
    );
  });
});
