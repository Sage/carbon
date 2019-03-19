import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p> Radio Button Component </p>
    <p>A radio button widget. Selects one option from a longer list.</p>
    <StoryHeader> Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import Radio Button from {'"carbon-react/lib/components/radio-button"'}</StoryCode>

    <p>To render the radiobutton:</p>
    <StoryCodeBlock>
      {'<RadioButton name="frequency" value="weekly" label="Weekly"/>'}
      {'<RadioButton name="frequency" value="2weekly" label="2 Weekly"/>'}
      {'<RadioButton name="frequency" value="4weekly" label="4 Weekly"/>'}
      {'<RadioButton name="frequency" value="monthly" label="Monthly"/>'}
    </StoryCodeBlock>

    <p>For additional properties specific to this component, see propTypes.</p>
  </div>
);

export default info;
