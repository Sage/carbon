import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import MountInApp from './mount-in-app';
import notes from './notes.md';

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
      text: `
        # Mount In App component

        Can be used to integrate React components into pre-existing user interfaces.

        ## How to use a MountInApp component:

        Import the component:

        ~~~JS
        import MountInApp from 'carbon-react/lib/components/mount-in-app';
        ~~~

        Imagine that your pre-existing user interface has a \`<div id="put_carbon_component_here" />\`
        inside which you want to put your new React component.

        To do that create a new React component that renders:

        ~~~JS
        <MountInApp targetId="put_carbon_component_here">
          <div>Hello</div>
          <div>I'm a react component rendered in an existing UI</div>
        </MountInApp>
        ~~~
      `
    },
    notes: { markdown: notes }
  });
