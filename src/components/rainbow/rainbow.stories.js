import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object } from '@storybook/addon-knobs';
import Immutable from 'immutable';
import Highcharts from 'highcharts';
import Rainbow from './rainbow';
import { notes, info } from './documentation';

global.Highcharts = Highcharts;
const myImmutableData = Immutable.fromJS([
  {
    y: 30,
    name: 'First Bit',
    label: 'label for first bit',
    tooltip: 'more info about this bit',
    color: '#000'
  },
  {
    y: 70,
    name: 'Second Bit',
    label: 'label for second bit',
    tooltip: 'more info about this bit'
  }
]);

storiesOf('Rainbow ', module).add(
  'default',
  () => {
    const data = object('data', myImmutableData);
    const title = text('title', 'Rainbow chart');

    return <Rainbow title={ title } data={ data } />;
  },
  {
    notes: { markdown: notes },
    info: { text: info }
  }
);
