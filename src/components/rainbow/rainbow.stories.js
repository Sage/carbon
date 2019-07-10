import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object } from '@storybook/addon-knobs';
import Immutable from 'immutable';
import Highcharts from 'highcharts';
import Rainbow from './rainbow.component';
import { notes, info } from './documentation';

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

storiesOf('Rainbow ', module).add(
  'default',
  () => {
    const data = object('data', myImmutableData);
    const title = text('title', 'Rainbow chart');

    return <Rainbow title={ title } data={ Immutable.fromJS(data) } />;
  },
  {
    notes: { markdown: notes },
    info: { text: info }
  }
);
