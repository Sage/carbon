import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text, select, boolean
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation/notes.md';
import ButtonToggle from './button-toggle.component';

storiesOf('Button Toggle', module)
  .add('default', () => {
    const children = text('children', 'Option');
    const buttonIcon = select('buttonIcon', [null, ...OptionsHelper.icons]);
    const buttonIconSize = select(
      'buttonIconSize',
      OptionsHelper.sizesBinary,
      ButtonToggle.defaultProps.buttonIconSize
    );
    const size = select('size', OptionsHelper.sizesBinary, ButtonToggle.defaultProps.size);
    const disabled = boolean('disabled', false);
    const grouped = boolean('grouped', false);

    const onChange = (ev) => {
      action('onChange')(ev);
    };

    return (
      [
        <ButtonToggle
          name='new-button-toggle'
          size={ size }
          buttonIcon={ buttonIcon }
          buttonIconSize={ buttonIconSize }
          disabled={ disabled }
          grouped={ grouped }
          onChange={ onChange }
          key='button-toggle-1'
        >
          {children}
        </ButtonToggle>,
        <ButtonToggle
          name='new-button-toggle'
          size={ size }
          buttonIcon={ buttonIcon }
          buttonIconSize={ buttonIconSize }
          disabled={ disabled }
          grouped={ grouped }
          onChange={ onChange }
          key='button-toggle-2'
        >
          {children}
        </ButtonToggle>,
        <ButtonToggle
          name='new-button-toggle'
          size={ size }
          buttonIcon={ buttonIcon }
          buttonIconSize={ buttonIconSize }
          disabled={ disabled }
          grouped={ grouped }
          onChange={ onChange }
          key='button-toggle-3'
        >
          {children}
        </ButtonToggle>
      ]
    );
  }, {
    notes: { markdown: notes }
  });
