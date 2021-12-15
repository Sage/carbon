import React from "react";
import { shallow, mount } from "enzyme";
import { ThemeProvider } from "styled-components";

import mintTheme from "../../style/themes/mint";
import aegeanTheme from "../../style/themes/aegean";
import CarbonProvider from "./carbon-provider.component";

const render = (props, renderer = shallow) => {
  return renderer(<CarbonProvider {...props} />);
};

describe("CarbonProvider", () => {
  it("renders the default props and children", () => {
    const wrapper = render({ children: "children" }, mount);

    expect(wrapper.find(ThemeProvider).prop("theme")).toBe(mintTheme);
    expect(wrapper.find(ThemeProvider).text()).toBe("children");
  });

  it("renders with the passed theme", () => {
    const wrapper = render({ children: "children", theme: aegeanTheme });

    expect(wrapper.find(ThemeProvider).prop("theme")).toBe(aegeanTheme);
  });
});
