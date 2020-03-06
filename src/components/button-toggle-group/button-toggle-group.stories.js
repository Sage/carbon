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
  title: 'Test/Button Toggle Group',
  component: ButtonToggleGroup,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true
    },
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


function renderButtons(groupName) {
  const buttonNames = ['Foo', 'Bar', 'Baz'];

  return buttonNames.map((name) => {
    return (
      <ButtonToggle
        name={ groupName }
        id={ name.toLowerCase() }
        key={ name }
        value={ name }
      >
        { name }
      </ButtonToggle>
    );
  });
}

export const Basic = () => {
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
        { renderButtons('button-toggle-group-dls') }
      </ButtonToggleGroup>
    </State>
  );
};

Basic.story = {
  name: 'Basic'
};

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
    themeSelector: classicThemeSelector
  }
};
