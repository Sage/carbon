import React from 'react';

import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { checkA11y } from '@storybook/addon-a11y';
import { withNotes } from '@storybook/addon-notes';
// import { withInfo } from '@storybook/addon-info';

import { ThemeProvider } from 'styled-components';

const theme = {
  main: 'palevioletred',
  secondary: 'lightblue'
}

const req = require.context('../src/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withKnobs);
addDecorator(checkA11y);
addDecorator(withNotes);
// addDecorator(withInfo);

// give all stories access to themes
addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

configure(loadStories, module);