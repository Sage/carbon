import React from "react";
import { mount } from "enzyme";
import { aegeanTheme, mintTheme, noTheme, sageTheme } from "../../themes";
import CarbonScopedTokensProvider from "./carbon-scoped-tokens-provider.component";
import { noThemeSnapshot } from "../../../__spec_helper__/enzyme-snapshot-helper";

const render = (theme) => mount(<CarbonScopedTokensProvider theme={theme} />);

describe("CarbonScopedTokensProvider", () => {
  it.each([
    [aegeanTheme.name, aegeanTheme],
    [mintTheme.name, mintTheme],
    [noTheme.name, noTheme],
    [sageTheme.name, sageTheme],
  ])("should render css variables for %s theme", (themeName, theme) => {
    const provider = render(theme);
    expect(noThemeSnapshot(provider)).toMatchSnapshot();
  });
});
