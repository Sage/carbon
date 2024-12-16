import { makeDecorator } from "@storybook/preview-api";
import isChromatic from "./isChromatic";
import React from "react";
import styled from "styled-components";
import CarbonProvider from "../src/components/carbon-provider";
import { noTheme, sageTheme } from "../src/style/themes";
import { config } from "react-transition-group";

const themes = [noTheme, sageTheme].reduce((themesObject, theme) => {
  themesObject[theme.name] = theme;
  return themesObject;
}, {});

const render = (
  Story,
  themeName,
  roundedCornersOptOut,
  focusRedesignOptOut,
) => (
  <CarbonProvider
    theme={themes[themeName]}
    roundedCornersOptOut={roundedCornersOptOut}
    focusRedesignOptOut={focusRedesignOptOut}
  >
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
    },
  ) => {
    const { theme: chromaticTheme, fourColumnLayout } = parameters.chromatic;
    const isChromaticBuild = isChromatic();

    // Disable transitions
    config.disabled = isChromaticBuild;

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
                context.globals.roundedCorners === "off",
                context.globals.focusRedesign === "off",
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
      context.globals.roundedCorners === "off",
      context.globals.focusRedesign === "off",
    );
  },
});

export const globalThemeProvider = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: sageTheme.name,
    toolbar: {
      title: "Theme",
      icon: "paintbrush",
      items: Object.keys(themes),
    },
  },
};

export { withThemeProvider };
