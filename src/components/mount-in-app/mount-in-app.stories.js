import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import MountInApp from './mount-in-app';
import notes from './notes.md';
import '../../style/storybook-info-details.scss';

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
      text:
        <div className='storybook-info'>
          <p>Mount In App component.</p>
          <p>Can be used to integrate React components into pre-existing user interfaces.</p>
          <h1>Implementation</h1>
          <p>Import the component:</p>
          <code className='storybook-code'>
            import MountInApp from 'carbon-react/lib/components/mount-in-app';
          </code>
          <p>
            Imagine that your pre-existing user interface has
            a <code>{`<div id="put_carbon_component_here" />`}</code> inside which you want
            to put your new React component.
          </p>
          <p>To do that create a new React component that renders:</p>
          <pre className='storybook-code'>
            <code>{`<MountInApp targetId="put_carbon_component_here">`}</code>
            <code>{`  <div>Hello</div>`}</code>
            <code>{`  <div>I'm a react component rendered in an existing UI</div>`}</code>
            <code>{`</MountInApp>`}</code>
          </pre>
        </div>
    },
    notes: { markdown: notes }
  });
