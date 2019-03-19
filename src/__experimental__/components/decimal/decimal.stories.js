import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, number, select } from '@storybook/addon-knobs';
import { Decimal } from '.';
// import { Store, State } from '@sambego/storybook-state';
import OptionsHelper from '../../../utils/helpers/options-helper';

storiesOf('Experimental/Decimal', module)
  .add('default', () => {
    return (
      <Decimal
        align={ select('align', OptionsHelper.alignBinary) }
        precision={ number('precision') }
        timeToDisappear={ number('timeToDisappear') }
        inputWidth={ number('inputWidth') }
        fieldHelp={ text('fieldHelp') }
        fieldHelpInline={ boolean('fieldHelpInline') }
        label={ text('label') }
        labelInline={ boolean('labelInline') }
        labelWidth={ number('labelWidth') }
        labelAlign={ text('labelAlign', OptionsHelper.alignBinary) }
        labelHelp={ text('labelHelp') }
      />
    );
  });
