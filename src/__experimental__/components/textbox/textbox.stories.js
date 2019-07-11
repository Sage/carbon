import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean,
  text,
  select,
  number
} from '@storybook/addon-knobs';
import { Store, State } from '@sambego/storybook-state';
import { notes, info, infoValidations } from './documentation';
import Textbox, { OriginalTextbox } from '.';
import OptionsHelper from '../../../utils/helpers/options-helper';

// set the display name so the story source makes sense
Textbox.displayName = 'Textbox';

const defaultStoryPropsConfig = {
  inputWidthEnabled: true
};

const store = new Store(
  {
    value: ''
  }
);

const setValue = (ev) => {
  store.set({ value: ev.target.value });
};

storiesOf('Experimental/Textbox', module)
  .add('default', () => {
    return (
      <Textbox
        placeholder={ text('placeholder') }
        { ...getCommonTextboxStoryProps() }
      />
    );
  }, {
    info: {
      text: info,
      propTables: [OriginalTextbox],
      propTablesExclude: [State, Textbox]
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  })
  .add('multiple', () => {
    return ([

      <Textbox
        placeholder={ text('placeholder') }
        key='0'
        { ...getCommonTextboxStoryProps() }
      />,
      <Textbox
        placeholder={ text('placeholder') }
        key='1'
        { ...getCommonTextboxStoryProps() }
      />
    ]);
  }, {
    info: {
      text: info,
      propTables: [OriginalTextbox],
      propTablesExclude: [State, Textbox]
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  })
  .add('validations', () => {
    return (
      <State store={ store }>
        <Textbox
          placeholder={ text('placeholder') }
          name='textbox'
          warnings={ [warningValidator] }
          validations={ [errorValidator] }
          info={ [lengthValidator] }
          onChange={ setValue }
        />
      </State>
    );
  }, {
    info: {
      source: false,
      text: infoValidations,
      propTablesExclude: [State, Textbox]
    }
  });


function getCommonTextboxStoryProps(config = defaultStoryPropsConfig) {
  const percentageRange = {
    range: true,
    min: 0,
    max: 100,
    step: 1
  };
  const disabled = boolean('disabled', false);
  const readOnly = boolean('readOnly', false);
  const fieldHelp = text('fieldHelp');
  const label = text('label');
  const labelHelp = label ? text('labelHelp') : undefined;
  const labelInline = label ? boolean('labelInline', false) : undefined;
  const labelWidth = labelInline ? number('labelWidth', 30, percentageRange) : undefined;
  const inputWidth = labelInline && config.inputWidthEnabled ? number('inputWidth', 70, percentageRange) : undefined;
  const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : undefined;
  const size = select('size', OptionsHelper.sizesRestricted, 'medium');

  return {
    disabled,
    readOnly,
    inputWidth,
    fieldHelp,
    label,
    labelHelp,
    labelInline,
    labelWidth,
    labelAlign,
    size
  };
}

function errorValidator(value) {
  return new Promise((resolve, reject) => {
    if (!value.includes('error')) {
      resolve();
    } else {
      reject(new Error('This value must not include the word "error"!'));
    }
  });
}

function warningValidator(value) {
  return new Promise((resolve, reject) => {
    if (!value.includes('warning')) {
      resolve();
    } else {
      reject(new Error('This value must not include the word "warning"!'));
    }
  });
}

function lengthValidator(value) {
  return new Promise((resolve, reject) => {
    if (value.length > 12) return resolve(true);
    return reject(Error('This value should be longer than 12 characters'));
  });
}

export default getCommonTextboxStoryProps;
