import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import SplitButton from './split-button';
import OptionsHelper from '../../utils/helpers/options-helper';
import Button from '../button';
import notes from './notes.md';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../.storybook/style/storybook-info.styles';

storiesOf('Split Button', module)
  .addParameters({
    info: {
      propTablesExclude: [Button]
    }
  })
  .add(
    'default',
    () => {
      const as = select('as', OptionsHelper.themesBinary, SplitButton.defaultProps.as);
      const dataElement = text('data-element');
      const dataRole = text('data-role');
      const disabled = boolean('disabled', SplitButton.defaultProps.disabled);
      const textContent = text('text', 'Example Split Button');

      return (
        <SplitButton
          as={ as } data-element={ dataElement }
          data-role={ dataRole } disabled={ disabled }
          text={ textContent }
        >
          <Button>Example Button</Button>
          <Button>Example Button</Button>
          <Button>Example Button</Button>
        </SplitButton>
      );
    },
    {
      info: {
        text: (
          <div>
            <p> Split Button component </p>
            <StoryHeader> Implementation</StoryHeader>

            <p>Import the component:</p>
            <StoryCode padded>import SplitButton from {'"react-carbon/lib/components/split-button"'}</StoryCode>

            <p>To render a SplitButton (developer can add any buttons to dropdown):</p>
            <StoryCodeBlock>
              {'<SplitButton text="Main Button" onClick={ clickHandler }>'}
              {'  <Button onClick="buttonClickHandler1">Button name 1</Button>'}
              {'  <Button onClick="buttonClickHandler2">Button name 2</Button>'}
              {'</SplitButton>'}
            </StoryCodeBlock>
          </div>
        )
      }
    },
    { notes: { markdown: notes } }
  );
