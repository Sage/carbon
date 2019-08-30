import React from 'react';
import { ThemeProvider } from 'styled-components';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import classic from '../src/style/themes/classic';
import small from '../src/style/themes/small';
import medium from '../src/style/themes/medium';
import large from '../src/style/themes/large';
import none from '../src/style/themes/none';

/** @see https://stackoverflow.com/questions/925039/detect-iframe-embedding-in-javascript */
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

  const themeName = (new URLSearchParams(window.location.search)).get('theme') || 'none';

  const themesMap = { classic, small, medium, large, none };

  const themeDecorator = story => (
    <ThemeProvider theme={ themesMap[themeName] }>
      {story()}
    </ThemeProvider>
  );

  return themeDecorator;
}
