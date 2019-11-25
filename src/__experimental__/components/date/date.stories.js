import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StateDecorator, Store, State } from '@sambego/storybook-state';
import {
  boolean,
  text
} from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import DateInput from './date.component';
import { OriginalTextbox } from '../textbox';
import getCommonTextboxStoryProps from '../textbox/textbox.stories';
import { notes, info, infoValidations } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

DateInput.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /date\.component(?!spec)/
);

OriginalTextbox.__docgenInfo = getDocGenInfo(
  require('../textbox/docgenInfo.json'),
  /textbox\.component(?!spec)/
);

const store = new Store(
  {
    value: ''
  }
);

const setValue = (ev) => {
  action('onChange')(ev);
  store.set({ value: ev.target.value.rawValue });
};

function makeStory(name, themeSelector) {
  const component = () => {
    const autoFocus = boolean('autoFocus', true);
    const minDate = text('minDate', '');
    const maxDate = text('maxDate', '');

    return (
      <DateInput
        { ...getCommonTextboxStoryProps({ inputWidthEnabled: false }) }
        name='dateinput'
        autoFocus={ autoFocus }
        minDate={ minDate }
        maxDate={ maxDate }
        value={ store.get('value') }
        onChange={ setValue }
        onBlur={ ev => action('onBlur')(ev) }
      />
    );
  };

  const metadata = {
    themeSelector,
    info: {
      text: info,
      propTables: [OriginalTextbox],
      propTablesExclude: [State],
      excludedPropTypes: ['children', 'leftChildren', 'inputIcon', 'placeholder', 'inputWidth']
    },
    notes: { markdown: notes }
  };

  return [name, component, metadata];
}

function makeValidationsStory(name, themeSelector) {
  const component = () => {
    return (
      <State store={ store }>
        <DateInput
          name='dateinput'
          placeholder={ text('placeholder') }
          validations={ [isNotFirstApr] }
          warnings={ [isNotSecondApr] }
          info={ [isNotThirdApr] }
          onChange={ setValue }
          onBlur={ ev => action('onBlur')(ev) }
        />
      </State>
    );
  };

  const metadata = {
    themeSelector,
    info: {
      source: false,
      text: infoValidations,
      propTables: [OriginalTextbox],
      propTablesExclude: [State]
    }
  };

  return [name, component, metadata];
}

storiesOf('Experimental/Date Input', module)
  .addDecorator(StateDecorator(store))
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector))
  .add(...makeValidationsStory('validations', dlsThemeSelector))
  .add(...makeValidationsStory('validations classic', classicThemeSelector));

function isNotFirstApr(value) {
  return new Promise((resolve, reject) => {
    if (value !== '01/04/2019') {
      resolve();
    } else {
      reject(new Error('April 1st 2019 cannot be selected!'));
    }
  });
}

function isNotSecondApr(value) {
  return new Promise((resolve, reject) => {
    if (value !== '02/04/2019') {
      resolve();
    } else {
      reject(new Error('Selecting April 2nd 2019 is not recommended'));
    }
  });
}

function isNotThirdApr(value) {
  return new Promise((resolve, reject) => {
    if (value !== '03/04/2019') {
      resolve();
    } else {
      reject(new Error('You have selected April 3rd 2019'));
    }
  });
}
