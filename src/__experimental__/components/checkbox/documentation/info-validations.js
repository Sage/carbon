import React from 'react';
import { StoryHeader } from '../../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <StoryHeader>Checkbox Component Validations</StoryHeader>
    <p>Uncheck first checkbox to show an <strong>error</strong> message.</p>
    <p>Uncheck second checkbox to show a <strong>warning</strong> message.</p>
    <p>Uncheck third checkbox to show a <strong>info</strong> message.</p>
  </div>
);

export default info;
