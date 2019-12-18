import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import {
  boolean, number, text, select
} from '@storybook/addon-knobs';
import { classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import Textbox from './textbox';
import { info, notes } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

Textbox.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /textbox(?!spec)/
);

const getIconKnobs = () => {
  const hasIcon = boolean('has icon', false);

  return {
    icon: hasIcon ? select('iconType', [...OptionsHelper.icons, ''], '') : undefined
  };
};

const store = new Store({
  value: ''
});

const handleChange = ({ target: { value } }) => {
  store.set({ value });
};

storiesOf('__deprecated__/Textbox', module)
  .addParameters({
    info: {
      propTablesExclude: [State],
      text: info
    },
    notes: { markdown: notes },
    themeSelector: classicThemeSelector
  })
  .add(
    'classic',
    () => {
      const rangeOptions = {
        range: true,
        min: 0,
        max: 300,
        setp: 1
      };

      const fieldHelpInline = boolean('fieldHelpInline', false);
      const label = text('label', 'Example Textbox');
      const labelInline = label ? boolean('labelInline', false) : undefined;
      const inputWidth = number('inputWidth', 0, rangeOptions);
      const labelWidth = labelInline ? number('labelWidth', 0, rangeOptions) : undefined;
      const labelHelp = text('labelHelp', 'This text provides more information for the label.');
      const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
      const labelAlign = labelInline ? select(
        'labelAlign',
        OptionsHelper.alignBinary,
        OptionsHelper.alignBinary[0]
      ) : undefined;

      return (
        <State store={ store }>
          <Textbox
            labelInline={ labelInline }
            labelAlign={ labelAlign }
            labelWidth={ labelWidth }
            fieldHelpInline={ fieldHelpInline }
            label={ label }
            labelHelp={ labelHelp }
            fieldHelp={ fieldHelp }
            inputWidth={ inputWidth }
            onChange={ handleChange }
            { ...getIconKnobs() }
          />
        </State>
      );
    }
  );
