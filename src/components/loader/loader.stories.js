import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Loader from './loader.component';
import Spinner from '../spinner/spinner.component';
import { OriginalButton } from '../button/button.component';
import { notes, info } from './documentation';
import { notesSpinner, infoSpinner } from '../spinner/documentation';

const styles = {
  textAlign: 'left'
};

storiesOf('Loader', module)
  .add(
    'default',
    () => {
      const size = select('size', OptionsHelper.sizesBinary, Loader.defaultProps.size);
      const isInsideButton = boolean('isInsideButton', false);
      const isActive = isInsideButton ? boolean('isActive', Loader.defaultProps.isActive) : undefined;

      if (isInsideButton) {
        return (
          <OriginalButton buttonType='primary' disabled={ !isActive }>
            <Loader
              size={ size } isInsideButton={ isInsideButton }
              isActive={ isActive }
            />
          </OriginalButton>
        );
      }
      return <Loader size={ size } style={ styles } />;
    },
    {
      info: {
        text: info,
        propTablesExclude: [OriginalButton]
      },
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
