import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';
import AppLayout from 'helpers/components/app-layout/app-layout';
import './style/storybook-info-details.scss';


const req = require.context('../src/components', true, /\.stories\.js$/);
const infoOptions = {
  header: false,
  inline: true
};

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withKnobs);
addDecorator(withNotes);
addDecorator(withInfo(infoOptions));

// give all stories access to themes
addDecorator(story => <AppLayout>{story()}</AppLayout>);

configure(loadStories, module);
