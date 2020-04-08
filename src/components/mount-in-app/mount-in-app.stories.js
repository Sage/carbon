import React from 'react';
import { storiesOf } from '@storybook/react';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import MountInApp from './mount-in-app';
import notes from './notes.md';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../.storybook/style/storybook-info.styles';
import getDocGenInfo from '../../utils/helpers/docgen-info';

MountInApp.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /mount-in-app.js(?!spec)/
);

function makeStory(name, themeSelector) {
  const component = () => {
    return (
      <div>
        <div id='carbon-demo'>Some content to be replaced.</div>

        <MountInApp
          targetId='carbon-demo'
        >
          <div>Content to be mounted!</div>
        </MountInApp>
      </div>
    );
  };

  const metadata = {
    themeSelector,
    info: {
      text: (
        <div>
          <p>Mount In App component.</p>

          <p>Can be used to integrate React components into pre-existing user interfaces.</p>

          <StoryHeader>Implementation</StoryHeader>

          <p>Import the component:</p>

          <StoryCode padded>
            import MountInApp from &quot;carbon-react/lib/components/mount-in-app&quot;;
          </StoryCode>

          <p>
            Imagine that your pre-existing user interface has
            a <StoryCode>{'<div id="put_carbon_component_here" />'}</StoryCode> inside which you want
            to put your new React component.
          </p>

          <p>To do that create a new React component that renders:</p>

          <StoryCodeBlock>
            {'<MountInApp targetId="put_carbon_component_here">'}
            {'  <div>Hello</div>'}
            {'  <div>I\'m a react component rendered in an existing UI</div>'}
            {'</MountInApp>'}
          </StoryCodeBlock>
        </div>
      )
    },
    notes: { markdown: notes }
  };

  return [name, component, metadata];
}

storiesOf('Mount In App', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
