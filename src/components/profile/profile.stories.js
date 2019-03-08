import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import Profile from './profile';
import notes from './notes.md';

storiesOf('Profile', module)
  .add('default', () => {
    const className = text('className', '');
    const email = text('email', 'andrewtale@sage.com');
    const initials = text('initials', 'AT');
    const large = boolean('large', false);
    const name = text('name', 'Andrew Tail');

    return (
      <Profile
        className={ className }
        email={ email }
        initials={ initials }
        large={ large }
        name={ name }
      />
    );
  }, {
    notes: { markdown: notes }
  });
