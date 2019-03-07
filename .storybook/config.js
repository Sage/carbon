import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';
import AppLayout from 'helpers/components/app-layout/app-layout';

const req = require.context('../src/components', true, /\.stories\.js$/);
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
