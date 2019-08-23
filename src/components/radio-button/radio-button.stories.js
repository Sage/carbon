import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { Store, State } from '@sambego/storybook-state';
import { classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import { RadioButton } from '../../__experimental__/components/radio-button';
import { notes, info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

RadioButton.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /radio-button(?!spec)/
);

const radioButtonsStore = new Store({
  selectedButton: ''
});

function handleChange(ev) {
  radioButtonsStore.set({ selectedButton: ev.target.value });
}

storiesOf('Radio Button', module).add(
  'classic',
  () => {
    const fieldHelp = text('fieldHelp', 'Additional information below the input.');
    const fieldHelpInline = boolean('fieldHelpInline', RadioButton.defaultProps.fieldHelpInline);
    const label = text('label', 'Example RadioButton');
    const labelInline = boolean('labelInline', false);
    const labelWidth = labelInline ? text('labelWidth', '') : undefined;
    const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary, 'left') : undefined;
    const labelHelp = text('labelHelp', 'Example label help text');
    const inputWidth = text('inputWidth', '');

    const buttonOneValue = 'button-one';
    const buttonTwoValue = 'button-two';

    return (
      <State store={ radioButtonsStore }>
        {state => [
          <RadioButton
            checked={ state.selectedButton === buttonOneValue }
            key='first-button'
            fieldHelp={ fieldHelp }
            fieldHelpInline={ fieldHelpInline }
            inputWidth={ inputWidth }
            label={ label }
            labelAlign={ labelAlign }
            labelHelp={ labelHelp }
            labelInline={ labelInline }
            labelWidth={ labelWidth }
            name='radio-buttons-example'
            onChange={ handleChange }
            value={ buttonOneValue }
          />,
          <RadioButton
            checked={ state.selectedButton === buttonTwoValue }
            key='second-button'
            fieldHelp={ fieldHelp }
            fieldHelpInline={ fieldHelpInline }
            inputWidth={ inputWidth }
            label={ label }
            labelAlign={ labelAlign }
            labelHelp={ labelHelp }
            labelInline={ labelInline }
            labelWidth={ labelWidth }
            name='radio-buttons-example'
            onChange={ handleChange }
            value={ buttonTwoValue }
          />
        ]}
      </State>
    );
  },
  {
    notes: { markdown: notes },
    info: { text: info },
    themeSelector: classicThemeSelector
  }
);
