import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Filter from './filter';
import Textbox from '../textbox';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Filter.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /filter(?!spec)/
);

storiesOf('Filter Component', module)
  .addParameters({
    info: {
      propTablesExclude: [Textbox]
    }
  })
  .add('default', () => {
    const align = select('labelAlign', OptionsHelper.alignBinary);

    return (
      <Filter
        align={ align }
      >
        <Textbox
          label='First Name'
        />
        <Textbox
          label='Last Name'
        />
      </Filter>
    );
  });
