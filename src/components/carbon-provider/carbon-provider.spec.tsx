import React from "react";
import { shallow, mount } from "enzyme";
import { ThemeProvider } from "styled-components";

import mintTheme from "../../style/themes/mint";
import sageTheme from "../../style/themes/sage";
import CarbonProvider from "./carbon-provider.component";

describe("CarbonProvider", () => {
  it("renders the default props and children", () => {
    const wrapper = mount(<CarbonProvider>children</CarbonProvider>);

    expect(wrapper.find(ThemeProvider).prop("theme")).toStrictEqual({
      ...mintTheme,
      roundedCornersOptOut: false,
      focusRedesignOptOut: false,
    });
    expect(wrapper.find(ThemeProvider).text()).toBe("children");
  });

  it("renders with the passed theme", () => {
    const wrapper = shallow(
      <CarbonProvider theme={sageTheme}>children</CarbonProvider>
    );

    expect(wrapper.find(ThemeProvider).prop("theme")).toStrictEqual({
      ...sageTheme,
      roundedCornersOptOut: false,
      focusRedesignOptOut: false,
    });
  });
});
