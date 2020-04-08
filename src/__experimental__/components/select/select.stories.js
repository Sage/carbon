import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Store, State } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import { Select, Option } from '.';
import infoValidations from './documentation';
import OptionsHelper from '../../../utils/helpers/options-helper';
import getDocGenInfo from '../../../utils/helpers/docgen-info';
import docgenInfo from './docgenInfo.json';
import AutoFocus from '../../../utils/helpers/auto-focus';
import guid from '../../../utils/helpers/guid';

Select.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /select\.component(?!spec)/
);

Option.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /option\.component(?!spec)/
);

const singleSelectStore = new Store({
  value: ''
});

const multiSelectStore = new Store({
  value: []
});

const previous = {
  key: guid(),
  autoFocus: false
};

const commonKnobs = (store, enableMultiSelect = false) => {
  const filterable = boolean('filterable', Select.defaultProps.filterable);
  const typeAhead = filterable && boolean('typeAhead', Select.defaultProps.typeAhead);
  const label = text('label', '');
  const autoFocus = boolean('autoFocus', false);
  const isLoopable = boolean('isLoopable', false);
  const preventFocusAutoOpen = boolean('preventFocusAutoOpen', false);
  const key = AutoFocus.getKey(autoFocus, previous);

  const knobs = {
    key,
    disabled: boolean('disabled', false),
    onBlur: ev => action('blur')(ev),
    onKeyDown: ev => action('keyDown')(ev),
    onChange: (ev) => {
      const optionsObjects = ev.target.value;
      let value = optionsObjects.map(optionObject => optionObject.optionValue);
      if (!enableMultiSelect) {
        value = value[0];
      }
      store.set({ value });
      action('change')(ev);
    },
    placeholder: text('placeholder', ''),
    readOnly: boolean('readOnly', false),
    size: select('size', OptionsHelper.sizesRestricted, OptionsHelper.sizesRestricted[1]),
    transparent: boolean('transparent', false),
    filterable,
    typeAhead,
    autoFocus,
    label,
    isLoopable,
    preventFocusAutoOpen
  };

  if (label.length) {
    knobs.labelAlign = select('labelAlign', OptionsHelper.alignBinary, OptionsHelper.alignBinary[0]);
    knobs.labelInline = boolean('labelInline', false);
  }

  return knobs;
};

const selectOptionsLabels = [
  'Amber', 'Black', 'Blue', 'Brown', 'Green', 'Orange', 'Pink', 'Purple', 'Red', 'White', 'Yellow'
];

const selectOptions = selectOptionsLabels.map((label, index) => (
  <Option
    key={ label }
    text={ label }
    value={ String(index + 1) }
  />
));

const objectOptions = [
  {
    name: 'Book collection',
    link: 'ediBuchungserfassung.Sage.Rewe',
    synonyms: ['payment received', 'bank', 'payed', 'bill payed']
  },
  {
    name: 'Document entry',
    link: 'ediVKBelegerfassung.Sage.Wawi',
    synonyms: ['New Document', 'Opportunity', 'Lead', 'Offer']
  },
  {
    name: 'Articles',
    link: 'ediArtikelstamm.Sage.Wawi',
    synonyms: ['piece', 'thing']
  }
];

function validator(value, errorValue, errorMessage) {
  return new Promise((resolve, reject) => {
    if (value === errorValue) {
      reject(new Error(errorMessage));
    } else {
      resolve();
    }
  });
}

const selectValidation = value => validator(value, '2', '"Black" cannot be selected!');
const selectWarning = value => validator(value, '3', 'Selecting "Blue" is not recommended');
const selectInfo = value => validator(value, '4', 'You have selected "Brown"');

const defaultComponent = () => {
  return (
    <State store={ singleSelectStore }>
      <Select ariaLabel='singleSelect' { ...commonKnobs(singleSelectStore) }>
        { selectOptions }
      </Select>
    </State>
  );
};

const autoFocusComponent = () => {
  boolean('autoFocus', true);
  return defaultComponent();
};

const customFilterComponent = () => {
  const complexCustomFilter = (value, filter, item) => {
    if (value.includes(filter)) return true;
    if (
      item.synonyms.filter(synonym => synonym.toLowerCase().includes(filter))
        .length > 0
    ) {
      return true;
    }
    return false;
  };

  return (
    <State store={ singleSelectStore }>
      <p key='description'>For example type &apos;piece&apos;, article will be shown because that is a synonym</p>
      <Select
        key='select'
        ariaLabel='customFilter'
        customFilter={ complexCustomFilter }
        typeAhead={ false }
        { ...commonKnobs(singleSelectStore) }
      >
        { objectOptions.map(item => (
          <Option
            key={ `globalSearch.${item.name}` }
            text={ item.name }
            value={ item }
          />
        )) }
      </Select>
    </State>
  );
};

function makeStory(name, themeSelector, component) {
  const metadata = {
    themeSelector
  };

  return [name, component, metadata];
}

function makeMultipleStory(name, themeSelector) {
  const component = () => {
    return (
      <State store={ multiSelectStore }>
        <Select
          ariaLabel='multiSelect'
          enableMultiSelect
          { ...commonKnobs(multiSelectStore, true) }
        >
          { selectOptions }
        </Select>
      </State>
    );
  };

  const metadata = {
    themeSelector
  };

  return [name, component, metadata];
}

function makeValidationsStory(name, themeSelector) {
  const component = () => {
    return (
      <State store={ singleSelectStore }>
        <Select
          ariaLabel='singleSelect'
          { ...commonKnobs(singleSelectStore) }
          validations={ [selectValidation] }
          warnings={ [selectWarning] }
          info={ [selectInfo] }
        >
          { selectOptions }
        </Select>
      </State>
    );
  };

  const metadata = {
    themeSelector,
    info: {
      text: infoValidations,
      source: false,
      propTablesExclude: [Select, Option]
    }
  };

  return [name, component, metadata];
}

function makeExternalValidationsStory(name, themeSelector) {
  const component = () => {
    return (
      <>
        <State store={ singleSelectStore }>
          <h3>Single select</h3>
          <Select
            ariaLabel='singleSelect'
            { ...commonKnobs(singleSelectStore) }
            hasError
            inputIcon='error'
            tooltipMessage='Error'
          >
            { selectOptions }
          </Select>
          <div style={ { height: 24 } } />
          <Select
            ariaLabel='singleSelect'
            { ...commonKnobs(singleSelectStore) }
            hasWarning
            inputIcon='warning'
            tooltipMessage='Warning'
          >
            { selectOptions }
          </Select>
          <div style={ { height: 24 } } />
          <Select
            ariaLabel='singleSelect'
            { ...commonKnobs(singleSelectStore) }
            hasInfo
            inputIcon='info'
            tooltipMessage='Info'
          >
            { selectOptions }
          </Select>
        </State>

        <State store={ multiSelectStore }>
          <h3>Multi select</h3>
          <Select
            ariaLabel='multiSelect'
            enableMultiSelect
            { ...commonKnobs(singleSelectStore) }
            hasError
            inputIcon='error'
            tooltipMessage='Error'
          >
            { selectOptions }
          </Select>
          <div style={ { height: 24 } } />
          <Select
            ariaLabel='multiSelect'
            enableMultiSelect
            { ...commonKnobs(singleSelectStore) }
            hasWarning
            inputIcon='warning'
            tooltipMessage='Warning'
          >
            { selectOptions }
          </Select>
          <div style={ { height: 24 } } />
          <Select
            ariaLabel='multiSelect'
            enableMultiSelect
            { ...commonKnobs(singleSelectStore) }
            hasInfo
            inputIcon='info'
            tooltipMessage='Info'
          >
            { selectOptions }
          </Select>
        </State>
      </>
    );
  };

  const metadata = {
    themeSelector,
    info: {
      text: infoValidations,
      source: false,
      propTablesExclude: [Select, Option]
    }
  };

  return [name, component, metadata];
}

storiesOf('Experimental/Select', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    },
    knobs: { escapeHTML: false }
  })
  .add(...makeStory('default', dlsThemeSelector, defaultComponent))
  .add(...makeStory('classic', classicThemeSelector, defaultComponent))
  .add(...makeMultipleStory('multiple', dlsThemeSelector))
  .add(...makeValidationsStory('validations', dlsThemeSelector))
  .add(...makeExternalValidationsStory('external validations', dlsThemeSelector))
  .add(...makeValidationsStory('validations classic', classicThemeSelector))
  .add(...makeStory('autoFocus', dlsThemeSelector, autoFocusComponent))
  .add(...makeStory('customFilter', dlsThemeSelector, customFilterComponent));
