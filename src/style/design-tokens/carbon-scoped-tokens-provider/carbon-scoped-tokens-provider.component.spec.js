import React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import { aegeanTheme, mintTheme, noTheme, sageTheme } from "../../themes";
import CarbonScopedTokensProvider from "./carbon-scoped-tokens-provider.component";

jest.mock("../../../__internal__/utils/helpers/guid", () => () => "guid");

describe("CarbonScopedTokensProvider", () => {
  it("should render css variables for all themes", () => {
    mount(
      <>
        <ThemeProvider theme={aegeanTheme}>
          <CarbonScopedTokensProvider />
        </ThemeProvider>
        <ThemeProvider theme={mintTheme}>
          <CarbonScopedTokensProvider />
        </ThemeProvider>
        <ThemeProvider theme={noTheme}>
          <CarbonScopedTokensProvider />
        </ThemeProvider>
        <ThemeProvider theme={sageTheme}>
          <CarbonScopedTokensProvider />
        </ThemeProvider>
      </>
    );

    expect(document.styleSheets[0].cssRules).toMatchSnapshot();
  });
});
