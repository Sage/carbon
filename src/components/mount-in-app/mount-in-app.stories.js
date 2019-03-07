import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import MountInApp from './mount-in-app';
import notes from './notes.md';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../.storybook/style/storybook-info.styles';

storiesOf('Mount In App', module)
  .add('default', () => {
    const children = text('children', 'Content to be mounted!');

    return (
      <div>
        <div id='carbon-demo'>Some content to be replaced.</div>

        <MountInApp
          targetId='carbon-demo'
        >
          <div>{ children }</div>
        </MountInApp>
      </div>
    );
  }, {
    info: {
      text: (
        <div>
          <p>Mount In App component.</p>

          <p>Can be used to integrate React components into pre-existing user interfaces.</p>

          <StoryHeader>Implementation</StoryHeader>

          <p>Import the component:</p>

          <StoryCode padded>{'import MountInApp from "carbon-react/lib/components/mount-in-app";'}</StoryCode>

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
  });
