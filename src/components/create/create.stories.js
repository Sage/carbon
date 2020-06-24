import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import notes from './documentation';
import Create from './create.component';
import getDocGenInfo from '../../utils/helpers/docgen-info';

const DeprecationWarning = () => (
  <div style={ {
    backgroundColor: 'red', textAlign: 'center', color: 'white', padding: 20, fontWeight: 'bold', marginBottom: 10
  } }
  >
    {/* eslint-disable-next-line max-len */}
    Create has been deprecated please see <a tabIndex={ 0 } href='https://github.com/Sage/carbon/issues/2891'>#2891</a>. A codemod to convert this to Button is available <a tabIndex={ 0 } href='https://github.com/Sage/carbon-codemod/tree/master/transforms/deprecate-create'>here</a>
  </div>
);

Create.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /create\.component(?!spec)/
);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const children = text('children', 'Resource Name');
    const className = text('className', '');

    return (
      <>
        <DeprecationWarning />
        <Create className={ className }>
          {children}
        </Create>
      </>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    chromatic: {
      disable: disableChromatic
    },
    info: {
      propTables: [Create]
    }
  };

  return [name, component, metadata];
}

storiesOf('Create', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector, true));
