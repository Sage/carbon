import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';
import setupI18n from '../demo/i18n/config';
import '../demo/i18n/en';
import './style/story-root.scss';
import { withThemeSelector } from './theme-selector'
import { addParameters } from '@storybook/react';
import sageTheme from './sageTheme';
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
  }
});

setupI18n();

addDecorator(withKnobs);
addDecorator(withInfo({
  header: false,
  inline: true,
}));
addDecorator(withA11y);
addDecorator(withThemeSelector);

window.STORYBOOK_GA_ID = 'UA-77028225-13';