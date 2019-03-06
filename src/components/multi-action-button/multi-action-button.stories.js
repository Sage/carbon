import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import MultiActionButton from './multi-action-button';
import notes from './notes.md';
import Button from '../button/button';
import OptionsHelper from '../../utils/helpers/options-helper';

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
      text: `
        # A MultiActionButton widget.

        ## How to use a MultiActionButton in a component:

        In your file

        ~~~JS
        import MultiActionButton from 'carbon-react/lib/components/multi-action-button';
        ~~~

        To render a MultiActionButton (developer can add any buttons to dropdown):

        ~~~JS
        <MultiActionButton text="Main Text">
          <Button onClick="buttonClickHandler1">Button name 1</Button>
          <Button onClick="buttonClickHandler2">Button name 2</Button>
        </MultiActionButton>
        ~~~
      `
    },
    notes: { markdown: notes }
  });
