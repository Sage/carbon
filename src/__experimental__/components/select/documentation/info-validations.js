import React from 'react';
import { StoryHeader } from '../../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <StoryHeader key='header'>Select Component Validations</StoryHeader>
    <p key='black'>Select &quot;Black&quot; to display an error message.</p>
    <p key='blue'>Select &quot;Blue&quot; to display a warning message.</p>
    <p key='brown'>Select &quot;Brown&quot; to display an info message.</p>
  </div>
);

export default info;
