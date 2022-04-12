import { makeDecorator } from "@storybook/addons";
import isChromatic from "./isChromatic";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CarbonProvider from "../src/components/carbon-provider";
import sageDebugTheme from "../src/style/design-tokens/debug-theme.util";
import {
  aegeanTheme,
  mintTheme,
  noTheme,
  sageTheme,
} from "../src/style/themes";
import { config } from "react-transition-group";
import WebFont from "webfontloader";

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

    // Disable transitions
    config.disabled = isChromaticBuild;

    // Only render the story once the fonts are loaded
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      WebFont.load({
        custom: {
          families: ["CarbonIcons", "Sage UI:n4,n7,n9"],
        },
        classes: false,
        active: () => setLoading(false),
        inactive: () => setLoading(new Error("Unable to load font files.")),
      });
    }, []);

    if (loading instanceof Error) {
      throw loading;
    }

    if (loading) {
      return <h1>Loading</h1>;
    }

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
