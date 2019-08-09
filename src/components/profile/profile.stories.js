import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import Profile, { OriginalProfile } from './profile.component';
import { info, notes } from './documentation';
import classicTheme from '../../style/themes/classic';
import OptionsHelper from '../../utils/helpers/options-helper';
import getDocGenInfo from '../../utils/helpers/docgen-info';

const ProfileWrapper = () => (<Profile />);
ProfileWrapper.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /profile\.component(?!spec)/
);

storiesOf('Profile', module)
  .add('default', () => {
    const email = text('email', 'johnsmith@sage.com');
    const initials = text('initials', 'JS');
    const size = select('size', OptionsHelper.sizesPortrait, OptionsHelper.sizesPortrait[0]);
    const name = text('name', 'John Smith');

    return (
      <ProfileWrapper
        email={ email }
        initials={ initials }
        size={ size }
        name={ name }
      />
    );
  },
  {
    info: { text: info, propTablesExclude: [ThemeProvider] },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  })
  .add('classic', () => {
    const email = text('email', 'johnsmith@sage.com');
    const initials = text('initials', 'JS');
    const large = boolean('large', OriginalProfile.defaultProps.large);
    const name = text('name', 'John Smith');

    return (
      <ThemeProvider theme={ classicTheme }>
        <ProfileWrapper
          email={ email }
          initials={ initials }
          large={ large }
          name={ name }
        />
      </ThemeProvider>
    );
  },
  {
    info: { text: info, propTablesExclude: [ThemeProvider] },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
