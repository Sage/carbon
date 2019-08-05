import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import notes from './documentation';
import Create from './create.component';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Create.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /create\.component(?!spec)/
);

storiesOf('Create', module)
  .add('default', () => {
    const children = text('children', 'Resource Name');
    const className = text('className', '');

    return (
      <Create
        className={ className }
      >
        {children}
      </Create>
    );
  }, {
    notes: { markdown: notes }
  });
