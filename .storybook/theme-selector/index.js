import React from "react";
import CarbonProvider from "../../src/components/carbon-provider";
import {
  mintTheme,
  aegeanTheme,
  noTheme,
  sageTheme,
} from "../../src/style/themes";
import addons, { makeDecorator } from "@storybook/addons";
import CarbonGlobalTokensProvider from "../../src/style/design-tokens/carbon-global-tokens-provider";
import isChromatic from "chromatic/isChromatic";
import styled from "styled-components";

export const ADDON_ID = "carbon/theme-selector";
export const PARAMS_EVENT = `${ADDON_ID}/params`;
const LOCAL_STORAGE_KEY = `${ADDON_ID}/theme`;

export const modernThemes = [mintTheme, aegeanTheme, noTheme, sageTheme].reduce(
  (themesObject, theme) => {
    themesObject[theme.name] = theme;
    return themesObject;
  },
  {}
);

if (process.env.STORYBOOK_DEBUG_THEME === "true") {
  (async () => {
    const sageDebugThemeModule = await import(
      "../../src/style/design-tokens/debug-theme.util"
    );

    modernThemes["sage-debug"] = sageDebugThemeModule.default;
  })();
}

export function getThemeName() {
  const theme = new URLSearchParams(window.location.search).get("theme");
  return (
    theme || window.localStorage.getItem(LOCAL_STORAGE_KEY) || sageTheme.name
  );
}

export function setThemeName(themeName) {
  return window.localStorage.setItem(LOCAL_STORAGE_KEY, themeName);
}

const render = (Story, themeName) => (
  <CarbonProvider theme={modernThemes[themeName]}>
    <CarbonGlobalTokensProvider />
    <Story themeName={themeName} />
  </CarbonProvider>
);

const FourColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const withThemeSelector = makeDecorator({
  name: "withThemeSelector",
  parameterName: "themeSelector",
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: false,
  wrapper: (
    Story,
    context,
    {
      parameters = {
        chromaticTheme: null,
        fourColumnLayout: false,
      },
    }
  ) => {
    const channel = addons.getChannel();
    channel.emit(PARAMS_EVENT, parameters);
    const themeName = parameters.chromaticTheme || getThemeName();
    if (
      themeName === "all" ||
      (isChromatic() &&
        window.origin !== process.env.STORYBOOK_CHROMATIC_ORIGIN &&
        !parameters.chromaticTheme)
    ) {
      const Wrapper = parameters.fourColumnLayout
        ? FourColumnLayout
        : React.Fragment;
      return (
        <Wrapper>
          {Object.keys(modernThemes).map((themeName) => (
            <div key={themeName}>
              <h3>{themeName}</h3>
              {render(Story, themeName)}
            </div>
          ))}
        </Wrapper>
      );
    }

    return render(Story, themeName);
  },
});
