import { makeDecorator } from "@storybook/addons";
import isChromatic from "./isChromatic";
import React from "react";
import styled from "styled-components";
import CarbonProvider from "../src/components/carbon-provider";
import sageDebugTheme from "../src/style/design-tokens/debug-theme.util";
import {
  aegeanTheme,
  mintTheme,
  noTheme,
  sageTheme,
} from "../src/style/themes";

const themes = [mintTheme, aegeanTheme, noTheme, sageTheme].reduce(
  (themesObject, theme) => {
    themesObject[theme.name] = theme;
    return themesObject;
  },
  {}
);

if (process.env.STORYBOOK_DEBUG_THEME === "true") {
  themes["sage-debug"] = sageDebugTheme;
}

const render = (Story, themeName) => (
  <CarbonProvider theme={themes[themeName]}>
    <Story themeName={themeName} />
  </CarbonProvider>
);

const FourColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const withThemeProvider = makeDecorator({
  name: "withThemeProvider",
  parameterName: "themeProvider",
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: false,
  wrapper: (
    Story,
    context,
    {
      parameters = {
        chromatic: {
          theme: null,
          fourColumnLayout: false,
        },
      },
    }
  ) => {
    const { theme: chromaticTheme, fourColumnLayout } = parameters.chromatic;
    const isChromaticBuild = isChromatic();

    if (isChromaticBuild && !chromaticTheme) {
      const Wrapper = fourColumnLayout ? FourColumnLayout : React.Fragment;
      return (
        <Wrapper>
          {Object.keys(themes).map((themeName) => (
            <div key={themeName}>
              <h3>{themeName}</h3>
              {render(Story, themeName)}
            </div>
          ))}
        </Wrapper>
      );
    }

    return render(
      Story,
      isChromaticBuild && chromaticTheme
        ? chromaticTheme
        : context.globals.theme
    );
  },
});

export const globalThemeProvider = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: sageTheme.name,
    toolbar: {
      icon: "paintbrush",
      items: Object.keys(themes),
      showName: true,
    },
  },
};

export { withThemeProvider };
