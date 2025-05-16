import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { noTheme, sageTheme } from "../../themes";
import CarbonScopedTokensProvider from "./carbon-scoped-tokens-provider.component";

jest.mock("../../../__internal__/utils/helpers/guid", () => () => "guid");

test("should render css variables for all themes when no adaptive sidebar as a modal is open", () => {
  render(
    <>
      <ThemeProvider theme={noTheme}>
        <CarbonScopedTokensProvider />
      </ThemeProvider>
      <ThemeProvider theme={sageTheme}>
        <CarbonScopedTokensProvider />
      </ThemeProvider>
    </>,
  );

  // Collect all the CSS stylesheets content for snapshot testing
  const cssRules = Array.from(document.styleSheets).flatMap((sheet) =>
    Array.from(sheet.cssRules).map((rule) => rule.cssText),
  );
  expect(cssRules).toMatchSnapshot();
});

test("should render css variables for all themes when adaptive sidebar as a modal is open", () => {
  render(
    <>
      <ThemeProvider theme={noTheme}>
        <CarbonScopedTokensProvider hasAdaptiveSidebarModalOpen />
      </ThemeProvider>
      <ThemeProvider theme={sageTheme}>
        <CarbonScopedTokensProvider hasAdaptiveSidebarModalOpen />
      </ThemeProvider>
    </>,
  );

  // Collect all the CSS stylesheets content for snapshot testing
  const cssRules = Array.from(document.styleSheets).flatMap((sheet) =>
    Array.from(sheet.cssRules).map((rule) => rule.cssText),
  );
  expect(cssRules).toMatchSnapshot();
});
