import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Filter from './filter';
import Textbox from '../textbox';

storiesOf('Filter', module)
  .add('default', () => {
    const align = select('labelAlign', OptionsHelper.alignBinary);

    return (
      <Filter
        align={ align }
      >
        <Textbox
          value=''
          label='First Name'
        />
        <Textbox
          value=''
          label='Last Name'
        />
      </Filter>
    );
  });
