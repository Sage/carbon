import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Loader from './loader.component';
import Spinner from '../spinner/spinner.component';
import Button from '../button/button.component';
import { notes, info } from './documentation';
import { notesSpinner, infoSpinner } from '../spinner/documentation';

storiesOf('Loader', module)
  .add(
    'default',
    () => {
      const size = select('size', OptionsHelper.sizesBinary, Loader.defaultProps.size);

      return <Loader size={ size } />;
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    }
  )
  .add(
    'inside a button',
    () => {
      const size = select('size', OptionsHelper.sizesBinary, Loader.defaultProps.size);
      const isInsideButton = boolean('isInsideButton', true);
      const state = isInsideButton ? select('state', ['on', 'off'], Loader.defaultProps.state) : undefined;

      return (
        <Button buttonType='primary' disabled={ state === 'off' }>
          <Loader
            size={ size } isInsideButton={ isInsideButton }
            state={ state }
          />
        </Button>
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    }
  )
  .add(
    'legacy spinner',
    () => {
      const type = select('as', OptionsHelper.colors, Spinner.defaultProps.as);
      const size = select('size', OptionsHelper.sizesFull, Spinner.defaultProps.size);

      return <Spinner as={ type } size={ size } />;
    },
    {
      info: { text: infoSpinner },
      notes: { markdown: notesSpinner }
    }
  );
