import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text,
  boolean,
  select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import GroupedCharacter from './grouped-character';

storiesOf('GroupedCharacter', module)
  .add('default', () => {
    const inputWidth = text('inputWidth', '');
    const separator = text('separator', GroupedCharacter.defaultProps.separator);
    const label = text('label', 'Example Grouped Character');
    const labelInline = boolean('labelInline', false);
    const labelWidth = labelInline ? text('labelWidth', '') : undefined;
    const labelAlign = labelInline ? select(
      'labelAlign',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ) : undefined;
    const labelHelp = text('labelHelp', 'More information for the label');
    const fieldHelp = text('fieldHelp', 'More information for the input');
    const fieldHelpInline = boolean('fieldHelpInline', true);

    return (
      <GroupedCharacter
        inputWidth={ inputWidth }
        separator={ separator }
        groups={ [2, 2, 2, 2] }
        label={ label }
        labelInline={ labelInline }
        labelWidth={ labelWidth }
        labelAlign={ labelAlign }
        labelHelp={ labelHelp }
        fieldHelp={ fieldHelp }
        fieldHelpInline={ fieldHelpInline }
        onChange={ (evt) => { action('change')(evt) } }
      />
    );
  }, {
    knobs: {
      escapeHTML: false
    }
  });
