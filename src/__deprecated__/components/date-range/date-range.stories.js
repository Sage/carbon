import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { classicThemeSelector } from '../../../../.storybook/theme-selectors';
import notes from './documentation';
import DateRange from './date-range.js';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

DateRange.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /date-range(?!spec)/
);

const store = new Store({
  value: ['2016-10-01', '2016-10-30']
});
const handleChange = (newDate) => {
  store.set({ value: newDate });
  action('changed')(newDate);
};

storiesOf('__deprecated__/Date Range', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('classic', () => {
    const endLabel = text('endLabel', '');
    const startLabel = text('startLabel', '');
    const startMessage = text('startMessage', 'Start date must not be later than the end date');
    const endMessage = text('endMessage', 'End date cannot be earlier than the start date');
    const labelLength = (startLabel.length || endLabel.length);
    const labelsInline = labelLength ? boolean('labelsInline', false) : undefined;

    return (
      <State store={ store }>
        <DateRange
          onChange={ handleChange }
          endLabel={ endLabel }
          value={ store.get('value') }
          startLabel={ startLabel }
          startMessage={ startMessage }
          endMessage={ endMessage }
          labelsInline={ labelsInline }
        />
      </State>
    );
  }, {
    notes: { markdown: notes },
    themeSelector: classicThemeSelector
  });
