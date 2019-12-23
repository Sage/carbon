import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import Profile, { OriginalProfile } from './profile.component';
import { info, notes } from './documentation';
import classicTheme from '../../style/themes/classic';
import OptionsHelper from '../../utils/helpers/options-helper';
import getDocGenInfo from '../../utils/helpers/docgen-info';

const ProfileWrapper = props => (<Profile { ...props } />);
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
    const src = text('src', '');

    return (
      <ProfileWrapper
        email={ email }
        initials={ initials }
        size={ size }
        name={ name }
        src={ src }
      />
    );
  },
  {
    themeSelector: dlsThemeSelector,
    info: { text: info, propTablesExclude: [ThemeProvider] },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  })
  .add('classic', () => {
    const email = text('email', 'johnsmith@sage.com');
    const initials = text('initials', 'JS');
    const large = boolean('large', OriginalProfile.defaultProps.large);
    const name = text('name', 'John Smith');
    const src = text('src', '');

    return (
      <ThemeProvider theme={ classicTheme }>
        <ProfileWrapper
          email={ email }
          initials={ initials }
          large={ large }
          name={ name }
          src={ src }
        />
      </ThemeProvider>
    );
  },
  {
    themeSelector: classicThemeSelector,
    info: { text: info, propTablesExclude: [ThemeProvider] },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
