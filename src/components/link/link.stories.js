import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import Link from './link.component.js';

storiesOf('Link', module).add('default', () => {
  const disabled = boolean('disabled', false);
  return (
    <Link
      icon='calendar' iconAlign='left'
      disabled={ disabled }
      to='https://www.google.com'
    >Sample Link
    </Link>
  );
});
