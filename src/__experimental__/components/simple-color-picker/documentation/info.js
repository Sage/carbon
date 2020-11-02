import React from "react";
import {
  StoryHeader,
  StoryCodeBlock,
} from "../../../../../.storybook/style/storybook-info.styles";

const info = (
  <div>
    <p>Simple Color Picker</p>
    <p>
      A component that displays squares with color samples that you can choose
      from.
    </p>

    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCodeBlock padded>
      {
        // eslint-disable-next-line max-len
        'import { SimpleColorPicker, SimpleColor } from "carbon-react/lib/__experimental__/components/simple-color-picker"'
      }
    </StoryCodeBlock>

    <p>To render the SimpleColorPicker:</p>
    <StoryCodeBlock padded>
      {
        '<SimpleColorPicker name="colorPicker" legend="Pick a colour" onChange={ onChange }>'
      }
      {"  <SimpleColor color='#00A376' aria-label='green' defaultChecked />"}
      {"  <SimpleColor color='#0073C1' aria-label='blue' />"}
      {"</SimpleColorPicker>"}
    </StoryCodeBlock>
  </div>
);

export default info;
