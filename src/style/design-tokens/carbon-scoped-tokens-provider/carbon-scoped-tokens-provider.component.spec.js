import React from "react";
import { mount } from "enzyme";
import { aegeanTheme, mintTheme, noTheme, sageTheme } from "../../themes";
import CarbonScopedTokensProvider from "./carbon-scoped-tokens-provider.component";

const render = (theme) => mount(<CarbonScopedTokensProvider theme={theme} />);

describe("CarbonScopedTokensProvider", () => {
  it.each([
    [aegeanTheme.name, aegeanTheme],
    [mintTheme.name, mintTheme],
    [noTheme.name, noTheme],
    [sageTheme.name, sageTheme],
  ])("should render css variables for %s theme", (themeName, theme) => {
    render(theme);

    const cssRules = document.styleSheets[0].cssRules[0];
    const selector = cssRules.selectorText;
    const designTokensCssDefinition = cssRules.cssText.replace(selector, "");

    expect(designTokensCssDefinition).toMatchSnapshot();
  });
});
