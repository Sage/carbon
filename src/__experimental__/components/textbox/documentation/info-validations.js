import React from 'react';
import { StoryHeader } from '../../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <StoryHeader>Textbox Component Validations</StoryHeader>
    <p>Type &quot;error&quot; to show an error message.</p>
    <p>Type &quot;warning&quot; to show a warning message.</p>
    <p>Type at least 12 characters to hide the info message.</p>
  </div>
);

export default info;
