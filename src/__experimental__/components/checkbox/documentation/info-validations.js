import React from 'react';
import { StoryHeader } from '../../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <StoryHeader>Checkbox Component Validations</StoryHeader>
    <strong>In Form</strong>
    <p>Tab off the first checkbox to show a <strong>error</strong> state.</p>
    <p>Tab off the second checkbox to show a <strong>warning</strong> state.</p>
    <p>Tab off the third checkbox to show a <strong>info</strong> state.</p>

    <strong>In Group</strong>
    <p>Check first checkbox to see a <strong>warning</strong> state.</p>
    <p>Check second checkbox to see a <strong>info</strong> state.</p>
    <p>Check third checkbox to see a <strong>error</strong> state.</p>
  </div>
);

export default info;
