import React from 'react';
import Welcome from './welcome.component';
import { dlsThemeSelector } from '../theme-selectors';

export default {
  title: 'Welcome',
  component: Welcome,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true
    },
    docs: {
      disable: true
    },
    options: {
      showPanel: false
    }
  }
};

export const WelcomePage = () => <Welcome />;
