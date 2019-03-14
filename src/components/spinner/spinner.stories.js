import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Spinner from './spinner';
import notes from './notes.md';
import { StoryHeader, StoryCode } from '../../../.storybook/style/storybook-info.styles';

storiesOf('Spinner', module).add(
  'default',
  () => {
    const as = select('as', OptionsHelper.colors, Spinner.defaultProps.as);
    const size = select('size', OptionsHelper.sizesFull, Spinner.defaultProps.size);

    return <Spinner as={ as } size={ size } />;
  },
  {
    info: {
      text: (
        <div>
          <p>Spinner component.</p>

          <StoryHeader> Implementation</StoryHeader>

          <p>Import the component:</p>

          <StoryCode padded>i{'mport Spinner from "carbon-react/lib/components/spinner"'}</StoryCode>

          <p>
            You can pass a <StoryCode> {'size'} </StoryCode> property to adjust the size of the spinner
          </p>

          <p>The default is medium </p>

          <StoryCode padded>
            {'options: extra-small, small, medium-small, medium, medium-large, large and extra-large'}
          </StoryCode>
        </div>
      )
    }
  },
  { notes: { markdown: notes } }
);
