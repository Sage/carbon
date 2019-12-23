import React from 'react';
import { ThemeProvider } from 'styled-components';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { noTheme, classicTheme, carbonThemeList } from '../src/style/themes';

const carbonThemes = carbonThemeList.reduce((themesObject, theme) => {
  themesObject[theme.name] = theme;
  return themesObject
}, {});

/**
 * Detects whether the current window is the topmost window in the window hierarchy
 * (if not, then the current window is embedded in an <iframe>).
 */
function isStandalone() {
  return (window === window.top);
}

export default function getThemeDecorator() {
  if (!isStandalone()) {
    // We're running in the normal Storybook <iframe> environment (addons are available),
    // so we'll use the "storybook-addon-styled-component-theme" decorator.
    return withThemesProvider();
  }

  // We're running in a standalone environment ("iframe.html" only, so addons
  // are not available), so we'll create a decorator using <ThemeProvider>.

  const queryStringThemeName = (new URLSearchParams(window.location.search)).get('theme');

  const themesMap = { 
    classic: classicTheme,
    ...carbonThemes,
    none: noTheme
  };

  const themeDecorator = (story, storyArgs) => {
    const storyThemeName = (
      storyArgs &&
      storyArgs.parameters &&
      storyArgs.parameters.themeSelector &&
      storyArgs.parameters.themeSelector.themes &&
      storyArgs.parameters.themeSelector.themes.length > 0 &&
      storyArgs.parameters.themeSelector.themes[0].name
    );

    // If no theme name was provided in the query string, then use the name of
    // the first story-specific theme (if any), otherwise fallback to "none".
    const themeName = queryStringThemeName || storyThemeName || 'none';

    return (
      <ThemeProvider theme={ themesMap[themeName] }>
        {story()}
      </ThemeProvider>
    );
  };

  return themeDecorator;
}
