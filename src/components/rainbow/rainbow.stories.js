import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object } from '@storybook/addon-knobs';
import Immutable from 'immutable';
import Highcharts from 'highcharts';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import Rainbow from './rainbow.component';
import { notes, info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Rainbow.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /rainbow\.component(?!spec)/
);

global.Highcharts = Highcharts;
const myImmutableData = Immutable.fromJS([
  {
    y: 33,
    name: 'First Bit',
    label: 'label for first bit',
    tooltip: 'more info about this bit',
    color: '#00A376'
  },
  {
    y: 33,
    name: 'Second Bit',
    label: 'label for second bit',
    tooltip: 'more info about this bit',
    color: '#0077C8'
  },
  {
    y: 33,
    name: 'Third Bit',
    label: 'label for third bit',
    tooltip: 'more info about this bit',
    color: '#582C83'
  }
]);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const data = object('data', myImmutableData);
    const title = text('title', 'Rainbow chart');

    return <Rainbow title={ title } data={ Immutable.fromJS(data) } />;
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    info: { text: info },
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, component, metadata];
}

storiesOf('Rainbow ', module)
  .add(...makeStory('default', dlsThemeSelector, true))
  .add(...makeStory('classic', classicThemeSelector, true));
