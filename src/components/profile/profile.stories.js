import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import Profile from './profile';
import { info, notes } from './documentation';
import classicTheme from '../../style/themes/classic';
import OptionsHelper from '../../utils/helpers/options-helper';

storiesOf('Profile', module)
  .add('default', () => {
    const email = text('email', 'johnsmith@sage.com');
    const initials = text('initials', 'JS');
    const size = select('size', OptionsHelper.sizesFull, OptionsHelper.sizesFull[0]);
    const name = text('name', 'John Smith');

    return (
      <Profile
        email={ email }
        initials={ initials }
        size={ size }
        name={ name }
      />
    );
  })
  .add('classic', () => {
    const email = text('email', 'johnsmith@sage.com');
    const initials = text('initials', 'JS');
    const large = boolean('large', Profile.defaultProps.large);
    const name = text('name', 'John Smith');

    return (
      <ThemeProvider theme={ classicTheme }>
        <Profile
          email={ email }
          initials={ initials }
          large={ large }
          name={ name }
        />
      </ThemeProvider>
    );
  }, {
    info: { text: info },
    notes: { markdown: notes }
  });
