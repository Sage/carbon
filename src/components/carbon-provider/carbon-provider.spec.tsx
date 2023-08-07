import React from "react";
import { shallow, mount } from "enzyme";
import { ThemeProvider } from "styled-components";

import mintTheme from "../../style/themes/mint";
import aegeanTheme from "../../style/themes/aegean";
import CarbonProvider from "./carbon-provider.component";

describe("CarbonProvider", () => {
  it("renders the default props and children", () => {
    const wrapper = mount(<CarbonProvider>children</CarbonProvider>);

    expect(wrapper.find(ThemeProvider).prop("theme")).toStrictEqual({
      ...mintTheme,
      roundedCornersOptOut: false,
    });
    expect(wrapper.find(ThemeProvider).text()).toBe("children");
  });

  it("renders with the passed theme", () => {
    const wrapper = shallow(
      <CarbonProvider theme={aegeanTheme}>children</CarbonProvider>
    );

    expect(wrapper.find(ThemeProvider).prop("theme")).toStrictEqual({
      ...aegeanTheme,
      roundedCornersOptOut: false,
    });
  });
});
