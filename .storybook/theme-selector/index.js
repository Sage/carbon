import React from 'react';
import { ThemeProvider } from 'styled-components';
import { mintTheme, aegeanTheme, noTheme, classicTheme } from '../../src/style/themes';
import addons, { makeDecorator } from '@storybook/addons';

export const ADDON_ID = 'carbon/theme-selector';
export const PARAMS_EVENT = `${ADDON_ID}/params`
const LOCAL_STORAGE_KEY = `${ADDON_ID}/theme`

export const modernThemes = [mintTheme, aegeanTheme, noTheme].reduce((themesObject, theme) => {
  themesObject[theme.name] = theme;
  return themesObject
}, {});

export function getThemeName() {
  const theme = new URLSearchParams(window.location.search).get('theme');
  return theme || window.localStorage.getItem(LOCAL_STORAGE_KEY) || mintTheme.name;
}

export function setThemeName(themeName) {
  return window.localStorage.setItem(LOCAL_STORAGE_KEY, themeName);
}

export const withThemeSelector = makeDecorator({
  name: 'withThemeSelector',
  parameterName: 'themeSelector',
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: false,
  wrapper: (getStory, context, { parameters = {} }) => {
    const theme = parameters.isClassic ? classicTheme : modernThemes[getThemeName()];
    const channel = addons.getChannel();
    channel.emit(PARAMS_EVENT, parameters);
    return (
      <ThemeProvider theme={theme}>
        {getStory(context)}
      </ThemeProvider>
    )
  },
});

