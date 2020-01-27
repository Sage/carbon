import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import InlineInputs from '.';
import Textbox from '../../__experimental__/components/textbox';
import Decimal from '../../__experimental__/components/decimal';
import { Select, Option } from '../../__experimental__/components/select';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import OptionsHelper from '../../utils/helpers/options-helper';

InlineInputs.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /inline-inputs\.component(?!spec)/
);

const singleSelectStore = new Store({
  decimalValue: '0.00',
  selectValue: '1'
});

const handleDecimalChange = (ev) => {
  singleSelectStore.set({
    decimalValue: ev.target.value.rawValue
  });
};

const handleSelectChange = (ev) => {
  singleSelectStore.set({
    selectValue: ev.target.value[0].optionValue
  });
};

function makeStory(name, themeSelector) {
  const component = () => {
    const label = text('label', 'Inline Inputs');
    const gutter = select('gutter size', ['none', ...OptionsHelper.sizesFull], InlineInputs.defaultProps.gutter);

    return (
      <State store={ singleSelectStore }>
        { state => (
          <InlineInputs label={ label } gutter={ gutter }>
            <Textbox />
            <Decimal value={ state.decimalValue } onChange={ handleDecimalChange } />
            <Select value={ state.selectValue } onChange={ handleSelectChange }>
              <Option text='Amber' value='1' />
              <Option text='Black' value='2' />
              <Option text='Blue' value='3' />
              <Option text='Brown' value='4' />
              <Option text='Green' value='5' />
              <Option text='Orange' value='6' />
              <Option text='Pink' value='7' />
              <Option text='Purple' value='8' />
              <Option text='Red' value='9' />
              <Option text='White' value='10' />
              <Option text='Yellow' value='11' />
            </Select>
          </InlineInputs>
        )}
      </State>
    );
  };

  const metadata = {
    themeSelector,
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

storiesOf('InlineInputs', module)
  .addParameters({
    info: {
      propTables: [InlineInputs],
      propTablesExclude: [State]
    }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
