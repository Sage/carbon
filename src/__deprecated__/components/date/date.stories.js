import React from 'react';
import { storiesOf } from '@storybook/react';
import { StateDecorator, Store, State } from '@sambego/storybook-state';
import {
  boolean, number, text, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { notes, info } from './documentation';
import DateInput from '.';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

DateInput.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /date\.component(?!spec)/
);

const store = new Store(
  {
    value: DateInput.defaultProps.value
  }
);

const setValue = (ev) => {
  store.set({ value: ev.target.value });
  action('onChange')(ev);
};

storiesOf('__deprecated__/Date Input', module)
  .addDecorator(StateDecorator(store))
  .add('classic', () => {
    const autoFocus = boolean('autoFocus', true);
    const disabled = boolean('disabled', false);
    const minDate = text('minDate', '');
    const maxDate = text('maxDate', '');
    const readOnly = boolean('readOnly', false);
    const label = text('label', 'Example DateInput');
    const labelWidth = number('labelWidth', 0);
    const labelHelp = text('labelHelp', 'This text provides more information for the label.');
    const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
    const fieldHelpInline = boolean('fieldHelpInline', false);
    const labelInline = boolean('labelInline', false);
    const inputWidth = labelInline ? number('inputWidth', 0, {
      range: true,
      min: 0,
      max: 50,
      step: 1
    }) : undefined;
    const labelAlign = labelInline ? select(
      'labelAlign',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ) : undefined;

    return (
      <DateInput
        autoFocus={ autoFocus }
        disabled={ disabled }
        minDate={ minDate }
        maxDate={ maxDate }
        readOnly={ readOnly }
        label={ label }
        labelInline={ labelInline }
        labelWidth={ labelWidth }
        labelAlign={ labelAlign }
        labelHelp={ labelHelp }
        inputWidth={ inputWidth }
        fieldHelp={ fieldHelp }
        fieldHelpInline={ fieldHelpInline }
        value={ store.get('value') }
        onChange={ setValue }
      />
    );
  }, {
    info: { text: info, propTablesExclude: [State] },
    notes: { markdown: notes },
    themeSelector: classicThemeSelector
  });
