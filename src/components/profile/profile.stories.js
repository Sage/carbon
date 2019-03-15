import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import Profile from './profile';
import { info, notes } from './documentation';

storiesOf('Profile', module)
  .add('default', () => {
    const email = text('email', 'johnsmith@sage.com');
    const initials = text('initials', 'JS');
    const large = boolean('large', Profile.defaultProps.large);
    const name = text('name', 'John Smith');

    return (
      <Profile
        email={ email }
        initials={ initials }
        large={ large }
        name={ name }
      />
    );
  }, {
    info: { text: info },
    notes: { markdown: notes }
  });
