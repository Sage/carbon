import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import SplitButton from './split-button';
import OptionsHelper from '../../utils/helpers/options-helper';
import Button from '../button';
import notes from './notes.md';

storiesOf('Split Button', module).add(
  'default',
  () => {
    const as = select('as', OptionsHelper.themesBinary, OptionsHelper.themesBinary[0]);
    const dataElement = text('data-element');
    const dataRole = text('data-role');
    const disabled = boolean('disabled', false);
    const textContent = text('text', 'Example Split Button');

    return (
      <SplitButton
        as={ as } data-element={ dataElement }
        data-role={ dataRole } disabled={ disabled }
        text={ textContent }
      >
        <Button>Example Button</Button>
        <Button>Example Button</Button>
        <Button>Example Button</Button>
      </SplitButton>
    );
  },
  { notes: { markdown: notes } }
);
