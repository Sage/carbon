import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Simple Color Picker</p>
    <p>A component that displays squares with color samples that you can choose from.</p>

    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import SimpleColorPicker from {'"carbon-react/lib/components/simple-color-picker"'}</StoryCode>

    <p>To render the SimpleColorPicker:</p>
    <StoryCodeBlock>
      {'<SimpleColorPicker'}
      {' availableColors={["transparent", "#ff0102", "#34ff01"]}'}
      {' selectedColor="#34ff01"'}
      {' name="Picker"'}
      {'/>'}
    </StoryCodeBlock>
  </div>
);

export default info;
