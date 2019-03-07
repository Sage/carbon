import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import MultiActionButton from './multi-action-button';
import notes from './notes.md';
import Button from '../button/button';
import OptionsHelper from '../../utils/helpers/options-helper';
import './multi-action-button.stories.scss';

storiesOf('Multi Action Button', module)
  .addParameters({
    info: {
      propTablesExclude: [Button]
    }
  })
  .add('default', () => {
    const disabled = boolean('disabled', false);
    const label = text('text', 'Example Multi Action Button');
    const as = label ? select('as', ['primary', 'secondary', 'transparent'], 'secondary') : undefined;
    const align = select('align', OptionsHelper.alignBinary, OptionsHelper.alignBinary[0]);

    return (
      <MultiActionButton
        as={ as }
        disabled={ disabled }
        text={ label }
        align={ align }
      >
        <Button onClick={ action('Click button 1') }>Example Button 1</Button>
        <Button onClick={ action('Click button 2') }>Example Button 2</Button>
        <Button onClick={ action('Click button 3') }>Example Button 3</Button>
      </MultiActionButton>
    );
  }, {
    info: {
      text: (
        <div className='storybook-info'>
          <p>A MultiActionButton widget.</p>
          <h1>Implementation</h1>
          <p>In your file:</p>
          <code className='storybook-code'>
            {'import MultiActionButton from "carbon-react/lib/components/multi-action-button";'}
          </code>
          <p>To render a MultiActionButton (developer can add any buttons to dropdown):</p>
          <pre className='storybook-code'>
            <code>{'<MultiActionButton text="Main Text">'}</code>
            <code>{'  <Button onClick="buttonClickHandler1">Button name 1</Button>'}</code>
            <code>{'  <Button onClick="buttonClickHandler2">Button name 2</Button>'}</code>
            <code>{'</MultiActionButton>'}</code>
          </pre>
        </div>
      )
    },
    notes: { markdown: notes }
  });
