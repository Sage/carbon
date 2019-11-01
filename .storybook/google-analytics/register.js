// This is a modified version of @storybook/addon-google-analytics
// There is an outstanding issue which prevents us using the addon
// https://github.com/storybookjs/storybook/issues/6012
// https://github.com/storybookjs/storybook/tree/next/addons/google-analytics/src
// https://github.com/storybookjs/storybook/blob/next/LICENSE
import { window } from 'global';
import { addons } from '@storybook/addons';
import { STORY_CHANGED, STORY_ERRORED, STORY_MISSING } from '@storybook/core-events';
import ReactGA from 'react-ga';

addons.register('storybook/google-analytics', api => {
    if(window.location.origin + window.location.pathname !== 'https://carbon.sage.com/storybook/'){
      return;
    }
  ReactGA.initialize('UA-77028225-13');

  api.on(STORY_CHANGED, () => {
    const { path } = api.getUrlState();
    ReactGA.pageview(path);
  });

  api.on(STORY_ERRORED, (description) => {
    ReactGA.exception({
      description,
      fatal: true,
    });
  });
  
  api.on(STORY_MISSING, (id) => {
    ReactGA.exception({
      description: `attempted to render ${id}, but it is missing`,
      fatal: false,
    });
  });
});