import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';
import setupI18n from './utils/i18n/config';
import './utils/i18n/en';
import './style/story-root.scss';
import { withThemeSelector } from './theme-selector'
import { addParameters } from '@storybook/react';
import { configureActions } from '@storybook/addon-actions';
import sageTheme from './sageTheme';

// Temporary fix for issue mentioned in FE-2565 ticket
// Should be solved by the storybook team in foreseeable future
// https://github.com/storybookjs/storybook/issues/9948
configureActions({
  // Maximum depth of serialization for large objects
  depth: 4,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

addParameters({
  options: {
    isFullscreen: false,
    panelPosition: 'bottom',
    showNav: true,
    showPanel: true,
    theme: sageTheme,
    storySort: (a, b) => {
      if (a[1].kind === 'Welcome' || b[1].kind === 'Welcome') {
        return 1;
      }
      return a[1].id.localeCompare(b[1].id);
    }
  },
  a11y: {
    // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
    options: {
      runOnly: {
        type: 'tag',
        values: [
          'wcag2a', // WCAG 2.0 & WCAG 2.1 Level A
          'wcag2aa', // WCAG 2.0 & WCAG 2.1 Level AA
          'wcag21a', // WCAG 2.1 Level A
          'wcag21aa', // WCAG 2.1 Level AA
          'best-practice' // Best practices endorsed by Deque
        ],
      }
    }
  },
  chromatic: { disable: false },
});

setupI18n();

addDecorator(withKnobs);
addDecorator(withInfo({
  header: false,
  inline: true,
}));
addDecorator(withA11y);
addDecorator(withThemeSelector);