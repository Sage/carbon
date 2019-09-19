import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text,
  select,
  boolean,
  number
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import notes from './documentation/notes.md';
import Info from './documentation/Info';
import DropdownFilterAjax from './dropdown-filter-ajax';
import { enableMock } from '../../../../demo/xhr-mock';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

DropdownFilterAjax.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /dropdown-filter-ajax(?!spec)/
);

const store = new Store({
  value: '',
  visibleValue: ''
});

enableMock();

// Shared Props
const onChange = (evt) => {
  store.set({
    visibleValue: evt.target.visibleValue,
    value: evt.target.visibleValue
  });
  action('change')(evt);
};

const defaultKnobs = () => {
  const labelInline = boolean('labelInline');

  return {
    autoFocus: boolean('autoFocus'),
    cacheVisibleValue: boolean('cacheVisibleValue'),
    disabled: boolean('disabled'),
    readOnly: boolean('readOnly'),
    timeToDisappear: number('timeToDisappear'),
    label: text('label', 'Dropdown Label'),
    labelInline,
    labelWidth: labelInline ? text('labelWidth') : undefined,
    labelAlign: labelInline ? select('labelAlign', OptionsHelper.alignBinary) : undefined,
    labelHelp: text('labelHelp', 'This is help text'),
    inputWidth: text('inputWidth'),
    fieldHelp: text('fieldHelp', 'This is field help text'),
    fieldHelpInline: boolean('fieldHelpInline'),
    suggest: boolean('suggest'),
    freetext: boolean('freetext'),
    path: text('path', '/countries'),
    acceptHeader: text('acceptHeader', DropdownFilterAjax.defaultProps.acceptHeader),
    rowsPerRequest: number('rowsPerRequest', DropdownFilterAjax.defaultProps.rowsPerRequest),
    dataRequestTimeout: number(
      'dataRequestTimeout',
      DropdownFilterAjax.defaultProps.dataRequestTimeout
    )
  };
};

storiesOf('__deprecated__/DropdownFilterAjax', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('classic', () => {
    const props = defaultKnobs();

    return (
      <State store={ store }>
        <DropdownFilterAjax
          { ...props }
          getCustomHeaders={ () => ({}) }
          onChange={ onChange }
        />
      </State>
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes },
    themeSelector: classicThemeSelector
  })
  .add('withCreate', () => {
    const props = defaultKnobs();
    const create = (evt, component) => component.state.filter;
    const createText = text('createText');
    const createIconType = select('createIconType', OptionsHelper.icons, OptionsHelper.icons[0]);

    return (
      <State store={ store }>
        <DropdownFilterAjax
          { ...props }
          create={ create }
          createText={ createText }
          createIconType={ createIconType }
          getCustomHeaders={ () => ({}) }
          onChange={ onChange }
        />
      </State>
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false },
    themeSelector: classicThemeSelector
  });
