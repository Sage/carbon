import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean,
  text,
  select,
  number
} from '@storybook/addon-knobs';
import { Store, State } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import { notes, info, infoValidations } from './documentation';
import Textbox, { OriginalTextbox } from '.';
import OptionsHelper from '../../../utils/helpers/options-helper';
import getDocGenInfo from '../../../utils/helpers/docgen-info';
import AutoFocus from '../../../utils/helpers/auto-focus';
import guid from '../../../utils/helpers/guid';

OriginalTextbox.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /textbox\.component(?!spec)/
);

// set the display name so the story source makes sense
Textbox.displayName = 'Textbox';

const defaultStoryPropsConfig = {
  inputWidthEnabled: true
};

function makeStory(name, themeSelector, component) {
  const metadata = {
    themeSelector,
    info: {
      text: info,
      propTables: [OriginalTextbox],
      propTablesExclude: [State, Textbox]
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

const defaultTextbox = () => {
  return (
    <Textbox
      placeholder={ text('placeholder') }
      { ...getCommonTextboxProps() }
    />
  );
};

const autoFocusTextbox = () => {
  boolean('autoFocus', true);
  return (
    <Textbox
      placeholder={ text('placeholder') }
      { ...getCommonTextboxProps() }
    />
  );
};

const multipleTextbox = () => {
  const { key, ...rest } = getCommonTextboxProps();

  return ([
    <Textbox
      placeholder={ text('placeholder') }
      key='0'
      { ...rest }
    />,
    <Textbox
      placeholder={ text('placeholder') }
      key={ key }
      { ...rest }
    />
  ]);
};

const multipleTextboxAutoFocus = () => {
  boolean('autoFocus', true);
  return multipleTextbox();
};

function makeValidationsStory(name, themeSelector) {
  const store = new Store(
    {
      value: ''
    }
  );

  const setValue = (ev) => {
    store.set({ value: ev.target.value });
  };

  const component = () => {
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
  };

  const metadata = {
    themeSelector,
    info: {
      source: false,
      text: infoValidations,
      propTablesExclude: [State, Textbox]
    }
  };

  return [name, component, metadata];
}

const previous = {
  key: guid(),
  autoFocus: false
};

storiesOf('Experimental/Textbox', module)
  .add(...makeStory('default', dlsThemeSelector, defaultTextbox))
  .add(...makeStory('classic', classicThemeSelector, defaultTextbox))
  .add(...makeStory('multiple', dlsThemeSelector, multipleTextbox))
  .add(...makeValidationsStory('validations', dlsThemeSelector))
  .add(...makeValidationsStory('validations classic', classicThemeSelector))
  .add(...makeStory('autoFocus', dlsThemeSelector, autoFocusTextbox))
  .add(...makeStory('multiple autoFocus', dlsThemeSelector, multipleTextboxAutoFocus));

function getCommonTextboxProps(config = defaultStoryPropsConfig) {
  const percentageRange = {
    range: true,
    min: 0,
    max: 100,
    step: 1
  };
  const disabled = boolean('disabled', false);
  const readOnly = boolean('readOnly', false);
  const autoFocus = boolean('autoFocus', false);
  const fieldHelp = text('fieldHelp');
  const label = text('label');
  const labelHelp = label ? text('labelHelp') : undefined;
  const labelInline = label ? boolean('labelInline', false) : undefined;
  const labelWidth = labelInline ? number('labelWidth', 30, percentageRange) : undefined;
  const inputWidth = labelInline && config.inputWidthEnabled ? number('inputWidth', 70, percentageRange) : undefined;
  const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : undefined;
  const size = select('size', OptionsHelper.sizesRestricted, 'medium');
  const key = AutoFocus.getKey(autoFocus, previous);

  return {
    key,
    disabled,
    readOnly,
    autoFocus,
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

export default getCommonTextboxProps;
