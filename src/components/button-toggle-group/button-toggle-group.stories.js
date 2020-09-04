import React from 'react';
import {
  text, number, boolean, select, percentageRange
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import ButtonToggle from '../button-toggle/button-toggle.component';
import ButtonToggleGroup from './button-toggle-group.component';
import getDocGenInfo from '../../utils/helpers/docgen-info';

ButtonToggleGroup.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /button-toggle-group\.component(?!spec)/
);

export default {
  title: 'Button Toggle Group/Test',
  component: ButtonToggleGroup,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true
    },
    chromatic: {
      disable: true
    },
    knobs: { escapeHTML: false },
    propTablesInclude: [ButtonToggle, ButtonToggleGroup]
  }
};

const handleGroupChangeFactory = store => (event) => {
  const { value } = event.target;

  store.set({ value });

  action('onChange')(value);
};
const radioDLSToggleGroupStore = new Store({ value: '' });
const radioClassicToggleGroupStore = new Store({ value: '' });


function renderButtons(groupName, grouped) {
  const buttonNames = ['Foo', 'Bar', 'Baz'];

  return buttonNames.map((name) => {
    return (
      <ButtonToggle
        name={ groupName }
        id={ name.toLowerCase() }
        key={ name }
        value={ name }
        grouped={ grouped }
      >
        { name }
      </ButtonToggle>
    );
  });
}

// eslint-disable-next-line react/prop-types
export const Basic = ({ grouped }) => {
  const label = text('label', 'Example ButtonToggleGroup');
  const labelInline = boolean('labelInline', false);
  const labelWidth = labelInline ? number('labelWidth', 30, percentageRange) : undefined;
  const labelAlign = labelInline ? select(
    'labelAlign',
    OptionsHelper.alignBinary,
    OptionsHelper.alignBinary[0]
  ) : undefined;
  const labelHelp = text('labelHelp', 'This text provides more information for the label.');
  const inputWidth = labelInline ? number('inputWidth', 70, percentageRange) : undefined;
  const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
  const fieldHelpInline = boolean('fieldHelpInline', false);

  return (
    <State store={ radioDLSToggleGroupStore }>
      <ButtonToggleGroup
        id='button-toggle-group-id'
        label={ label }
        labelInline={ labelInline }
        labelWidth={ labelWidth }
        labelAlign={ labelAlign }
        labelHelp={ labelHelp }
        inputWidth={ inputWidth }
        fieldHelp={ fieldHelp }
        fieldHelpInline={ fieldHelpInline }
        name='button-toggle-group-dls'
        onChange={ handleGroupChangeFactory(radioDLSToggleGroupStore) }
      >
        { renderButtons('button-toggle-group-dls', grouped) }
      </ButtonToggleGroup>
    </State>
  );
};

export const BasicGrouped = () => <Basic grouped />;

// eslint-disable-next-line react/prop-types
export const Validations = ({ grouped }) => {
  const validationTypes = ['error', 'warning', 'info'];
  const label = text('label', 'Example ButtonToggleGroup');
  const labelHelp = text('labelHelp', 'This text provides more information for the label.');
  const fieldHelp = text('fieldHelp', 'This text provides help for the input.');

  return (
    <>
      <h4>Validation as string</h4>
      <h6>On component</h6>
      {validationTypes.map(validation => (
        <ButtonToggleGroup
          label={ label }
          labelHelp={ labelHelp }
          fieldHelp={ fieldHelp }
          name={ `button-toggle-group-validations_${validation}` }
          id={ `button-toggle-group-validations_${validation}` }
          onChange={ () => {} }
          key={ `${validation}-string-component` }
          { ...{ [validation]: 'Message' } }
        >
          { renderButtons('button-toggle-group-validations', grouped) }
        </ButtonToggleGroup>
      ))}
      <h6>On label</h6>
      {validationTypes.map(validation => (
        <ButtonToggleGroup
          label={ label }
          labelHelp={ labelHelp }
          fieldHelp={ fieldHelp }
          name={ `button-toggle-group-validations_${validation}_label` }
          id={ `button-toggle-group-validations_${validation}_label` }
          onChange={ () => {} }
          validationOnLabel
          key={ `${validation}-string-label` }
          { ...{ [validation]: 'Message' } }
        >
          { renderButtons('button-toggle-group-validations', grouped) }
        </ButtonToggleGroup>
      ))}

      <h4>Validation as boolean</h4>
      {validationTypes.map(validation => (
        <ButtonToggleGroup
          label={ label }
          labelHelp={ labelHelp }
          fieldHelp={ fieldHelp }
          name={ `button-toggle-group-validations_${validation}_boolean` }
          id={ `button-toggle-group-validations_${validation}_boolean` }
          onChange={ () => {} }
          key={ `${validation}-boolean` }
          { ...{ [validation]: true } }
        >
          { renderButtons('button-toggle-group-validations', grouped) }
        </ButtonToggleGroup>
      ))}
    </>
  );
};

export const ValidationsGrouped = () => <Validations grouped />;

export const Classic = () => {
  const label = text('label', 'Example ButtonToggleGroup');
  const labelInline = boolean('labelInline', false);
  const labelWidth = labelInline ? number('labelWidth', 30, percentageRange) : undefined;
  const labelAlign = labelInline ? select(
    'labelAlign',
    OptionsHelper.alignBinary,
    OptionsHelper.alignBinary[0]
  ) : undefined;
  const labelHelp = text('labelHelp', 'This text provides more information for the label.');
  const inputWidth = labelInline ? number('inputWidth', 70, percentageRange) : undefined;
  const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
  const fieldHelpInline = boolean('fieldHelpInline', false);

  return (
    <State store={ radioClassicToggleGroupStore }>
      <ButtonToggleGroup
        label={ label }
        labelInline={ labelInline }
        labelWidth={ labelWidth }
        labelAlign={ labelAlign }
        labelHelp={ labelHelp }
        inputWidth={ inputWidth }
        fieldHelp={ fieldHelp }
        fieldHelpInline={ fieldHelpInline }
        name='button-toggle-group-classic'
        id='button-toggle-group-classic'
        onChange={ handleGroupChangeFactory(radioClassicToggleGroupStore) }
      >
        { renderButtons('button-toggle-group-classic') }
      </ButtonToggleGroup>
    </State>
  );
};

Classic.story = {
  name: 'classic',
  parameters: {
    themeSelector: classicThemeSelector,
    chromatic: {
      disable: true
    }
  }
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: false
    }
  }
};

BasicGrouped.story = {
  parameters: {
    chromatic: {
      disable: false
    }
  }
};

ValidationsGrouped.story = {
  parameters: {
    chromatic: {
      disable: false
    }
  }
};

Validations.story = {
  parameters: {
    chromatic: {
      disable: false
    }
  }
};
