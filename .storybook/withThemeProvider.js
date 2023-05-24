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

const render = (Story, themeName, focusRedesignOptOut) => (
  <CarbonProvider theme={themes[themeName]}>
    {" "}
    <CarbonProvider
      theme={themes[themeName]}
      focusRedesignOptOut={focusRedesignOptOut}
    >
      <Story themeName={themeName} /> <Story themeName={themeName} />
    </CarbonProvider>{" "}
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

    const shouldLoadFonts = isChromatic() && document.fonts;
    const [loading, setLoading] = useState(shouldLoadFonts);

    useEffect(() => {
      if (!shouldLoadFonts) {
        return;
      }

      const fonts = [
        "400 1em Sage UI",
        "700 1em Sage UI",
        "900 1em Sage UI",
        "1em CarbonIcons",
      ];

      // These fonts are pre-loaded but we want to wait until they're finished loading
      Promise.all(fonts.map((fontName) => document.fonts.load(fontName))).then(
        (results) => {
          const firstError = results.findIndex((r) => r.length === 0);
          if (firstError >= 0) {
            setLoading(() => {
              throw new Error(`Font "${fonts[firstError]}" failed to load.`);
            });
          } else {
            setLoading(false);
          }
        }
      );
    }, []);

    if (loading) {
      return null;
    }

    if (isChromaticBuild && !chromaticTheme) {
      const Wrapper = fourColumnLayout ? FourColumnLayout : React.Fragment;
      return (
        <Wrapper>
          {Object.keys(themes).map((themeName) => (
            <div key={themeName}>
              <h3>{themeName}</h3>
              {render(
                Story,
                themeName,
                context.globals.focusRedesign === "off"
              )}
            </div>
          ))}
        </Wrapper>
      );
    }

    return render(
      Story,
      isChromaticBuild && chromaticTheme
        ? chromaticTheme
        : context.globals.theme,
      context.globals.focusRedesign === "off"
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
