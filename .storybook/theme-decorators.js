import React from 'react';
import { ThemeProvider } from 'styled-components';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import classicTheme from '../src/style/themes/classic';
import mintTheme from '../src/style/themes/mint';
import aegeanTheme from '../src/style/themes/aegean';
import none from '../src/style/themes/none';

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
    mint: mintTheme,
    aegean: aegeanTheme,
    none
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
