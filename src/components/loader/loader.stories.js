import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import Loader from '.';
import Button from '../button';

import { notes, info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Loader.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /loader\.component(?!spec)/
);

const styles = {
  textAlign: 'left'
};

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const size = select('size', OptionsHelper.sizesBinary, Loader.defaultProps.size);
    const isInsideButton = boolean('isInsideButton', false);
    const isActive = isInsideButton ? boolean('isActive', Loader.defaultProps.isActive) : undefined;

    if (isInsideButton) {
      return (
        <Button buttonType='primary' disabled={ !isActive }>
          <Loader
            size={ size } isInsideButton={ isInsideButton }
            isActive={ isActive }
          />
        </Button>
      );
    }
    return <Loader size={ size } style={ styles } />;
  };

  const metadata = {
    themeSelector,
    info: {
      text: info,
      propTablesExclude: [Button]
    },
    notes: { markdown: notes },
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, component, metadata];
}

storiesOf('Loader', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector, true));
