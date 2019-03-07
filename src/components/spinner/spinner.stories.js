import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Spinner from './spinner';
import notes from './notes.md';

storiesOf('Spinner', module).add('default', () => {
  const as = select('as', OptionsHelper.colors, OptionsHelper.colors[3]);
  const size = select('size', OptionsHelper.sizesFull, OptionsHelper.sizesFull[3]);

  return (
    <Spinner as={ as } size={ size } />
  );
}, { notes: { markdown: notes } });
