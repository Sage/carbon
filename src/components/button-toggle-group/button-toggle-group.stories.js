import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text, number, boolean, select, percentageRange
} from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation';
import ButtonToggle from '../button-toggle/button-toggle.component';
import ButtonToggleGroup from './button-toggle-group.component';
import getDocGenInfo from '../../utils/helpers/docgen-info';

ButtonToggleGroup.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /button-toggle-group\.component(?!spec)/
);

function makeStory(storyName, themeSelector) {
  const component = () => {
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

    function renderButtons() {
      const buttonNames = ['Foo', 'Bar', 'Baz'];

      return buttonNames.map((name) => {
        return (
          <ButtonToggle
            name='button-toggle-group'
            id={ name.toLowerCase() }
            key={ name }
            value={ name }
          >
            { name }
          </ButtonToggle>
        );
      });
    }

    return (
      <ButtonToggleGroup
        label={ label }
        labelInline={ labelInline }
        labelWidth={ labelWidth }
        labelAlign={ labelAlign }
        labelHelp={ labelHelp }
        inputWidth={ inputWidth }
        fieldHelp={ fieldHelp }
        fieldHelpInline={ fieldHelpInline }
      >
        { renderButtons() }
      </ButtonToggleGroup>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes }
  };

  return [storyName, component, metadata];
}

storiesOf('Button Toggle Group', module)
  .addParameters({
    info: {
      propTablesExclude: [ButtonToggle],
      propTables: [ButtonToggleGroup]
    }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
