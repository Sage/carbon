import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Radio Button Component</p>
    <p>
      A radio button widget. Selects one option from a longer list. Designed to be used with
      the RadioButtonGroup component, but can be used separately if you choose to write your own
      grouping (this is how the component was used pre-DLS).
    </p>
    <StoryHeader>Implementation</StoryHeader>

    <p>Import the components:</p>
    <StoryCodeBlock>
      {'import { RadioButton, RadioButtonGroup } from "carbon-react/lib/components/radio-button"'}
    </StoryCodeBlock>

    <p>To render the button group:</p>
    <StoryCodeBlock>
      {'<RadioButtonGroup groupName="frequency" legend="Please select a frequency from the options below">'}
      {'  <RadioButton value="weekly" label="Weekly"/>'}
      {'  <RadioButton value="monthly" label="Monthly"/>'}
      {'  <RadioButton value="annually" label="Annually"/>'}
      {'<RadioButtonGroup/>'}
    </StoryCodeBlock>

    <p>
      The <StoryCode>groupName</StoryCode> prop supplied to the <StoryCode>RadioButtonGroup</StoryCode> component
      is used to set the <StoryCode>name</StoryCode> prop for each child element. If using
      the buttons separately, this can be set manually on each button.
    </p>

    <p>
      The <StoryCode>id</StoryCode> prop for each button can be set manually. If none is set, a
      random GUID will be used instead.
    </p>

    <p>For additional properties specific to this component, see propTypes.</p>
  </div>
);

export default info;
