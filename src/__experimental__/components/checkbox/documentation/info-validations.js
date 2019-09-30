import React from 'react';
import { StoryHeader } from '../../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <StoryHeader>Checkbox Component Validations</StoryHeader>
    <strong>In Form</strong>
    <p>Check then uncheck the first checkbox to show an <strong>error</strong> icon.</p>
    <p>Check then uncheck the second checkbox to show a <strong>warning</strong> icon.</p>
    <p>Check then uncheck the third checkbox to show an <strong>info</strong> icon.</p>

    <strong>In Group</strong>
    <p>Check only one checkbox to show a <strong>warning</strong> icon.</p>
    <p>Check only two checkboxes to show an <strong>info</strong> icon.</p>
    <p>Check then uncheck all checkboxes to show an <strong>error</strong> icon.</p>
  </div>
);

export default info;
