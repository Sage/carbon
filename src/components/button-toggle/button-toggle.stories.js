import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text, select, number, boolean
} from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import ButtonToggle from './button-toggle';

storiesOf('Button Toggle', module)
  .add('default', () => {
    const children = text('children', 'Option');
    const buttonIcon = select('buttonIcon', [null, ...OptionsHelper.icons]);
    const buttonIconSize = select('buttonIconSize', OptionsHelper.sizesBinary, OptionsHelper.sizesBinary[0]);
    const size = select('size', OptionsHelper.sizesBinary, OptionsHelper.sizesBinary[1]);
    const disabled = boolean('disabled', false);
    const grouped = boolean('grouped', false);
    const deferTimeout = number('deferTimeout', 0);

    return (
      <ButtonToggle
        buttonIcon={ buttonIcon }
        buttonIconSize={ buttonIconSize }
        size={ size }
        disabled={ disabled }
        grouped={ grouped }
        deferTimeout={ deferTimeout }
      >
        {children}
      </ButtonToggle>
    );
  }, {
    notes: { markdown: notes }
  });
