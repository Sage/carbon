import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import Loader from './loader.component';
import Spinner from '../../__deprecated__/components/spinner';
import { OriginalButton } from '../button/button.component';
import { notes, info } from './documentation';
import { notesSpinner, infoSpinner } from '../../__deprecated__/components/spinner/documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Loader.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /loader\.component(?!spec)/
);

Spinner.__docgenInfo = getDocGenInfo(
  require('../../__deprecated__/components/spinner/docgenInfo.json'),
  /spinner\.component(?!spec)/
);

const styles = {
  textAlign: 'left'
};

function makeStory(name, themeSelector) {
  const component = () => {
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
  };

  const metadata = {
    themeSelector,
    info: {
      text: info,
      propTablesExclude: [OriginalButton]
    },
    notes: { markdown: notes }
  };

  return [name, component, metadata];
}

function makeLegacySpinnerStory(name, themeSelector) {
  const component = () => {
    const type = select('as', OptionsHelper.colors, Spinner.defaultProps.as);
    const size = select('size', OptionsHelper.sizesFull, Spinner.defaultProps.size);

    return <Spinner as={ type } size={ size } />;
  };

  const metadata = {
    themeSelector,
    info: { text: infoSpinner },
    notes: { markdown: notesSpinner }
  };

  return [name, component, metadata];
}

storiesOf('Loader', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector))
  .add(...makeLegacySpinnerStory('legacy spinner', dlsThemeSelector))
  .add(...makeLegacySpinnerStory('legacy spinner classic', classicThemeSelector));
