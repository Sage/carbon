import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text, select
  // text, select, boolean
} from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
// import notes from './notes.md';
import ButtonToggle from './button-toggle.component';

storiesOf('Button Toggle', module)
  .add('default', () => {
    const children = text('children', 'Option');
    const buttonIcon = select('buttonIcon', [null, ...OptionsHelper.icons]);
    // const buttonIconSize = select('buttonIconSize', OptionsHelper.sizesBinary, OptionsHelper.sizesBinary[0]);
    // const size = select('size', OptionsHelper.sizesBinary, ButtonToggle.defaultProps.size);
    // const disabled = boolean('disabled', false);
    // const grouped = boolean('grouped', false);

    return (
      [
        <ButtonToggle
          buttonIcon={ buttonIcon }
          key='key1'
        >
          {children}
        </ButtonToggle>,
        <ButtonToggle
          buttonIcon={ buttonIcon }
          key='key2'
        >
          {children}
        </ButtonToggle>,
        <ButtonToggle
          buttonIcon={ buttonIcon }
          key='key3'
        >
          {children}
        </ButtonToggle>
      ]
    );
  }, {
    // notes: { markdown: notes }
  });
