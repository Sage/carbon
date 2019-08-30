import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Loader from './loader.component';
import Spinner from '../spinner';
import { OriginalButton } from '../button/button.component';
import { notes, info } from './documentation';
import { notesSpinner, infoSpinner } from '../spinner/documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Loader.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /loader\.component(?!spec)/
);

Spinner.__docgenInfo = getDocGenInfo(
  require('../spinner/docgenInfo.json'),
  /spinner\.component(?!spec)/
);

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
