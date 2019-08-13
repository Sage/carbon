import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';
import AppLayout from 'helpers/components/app-layout/app-layout';
import setupI18n from '../demo/i18n/config';
import '../demo/i18n/en';
import './style/story-root.scss';

import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import sageTheme from './sageTheme';

// Option defaults.
addParameters({
  options: {
    isFullscreen: false,
    panelPosition: 'bottom',
    showNav: true,
    showPanel: true,
    theme: sageTheme
  },
});

setupI18n();

const req = require.context('../src', true, /\.stories\.js$/);
const infoOptions = {
  header: false,
  inline: true
};

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withKnobs);
addDecorator(withInfo(infoOptions));
addDecorator(withA11y);

// give all stories access to themes
addDecorator(story => <AppLayout>{story()}</AppLayout>);

configure(loadStories, module);
