import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>A Form widget.</p>

    <StoryHeader>How to use a Form in a component:</StoryHeader>

    <p>In your file</p>

    <StoryCode padded>
      {'import Form from "carbon-react/lib/components/form";'}
    </StoryCode>

    <p>To render a Form:</p>

    <StoryCodeBlock>
      {'<Form>'}
      {'  <Textbox />'}
      {'  <Textbox />'}
      {'  <Date />'}
      {'</Form>'}
    </StoryCodeBlock>

    <p>Form provides the ability to hook into the form handle submission method.</p>

    <p>
      Passing <StoryCode>afterFormValidation</StoryCode> or <StoryCode>beforeFormValidation</StoryCode> lets
      you add custom logic and <StoryCode>ev.preventDefault()</StoryCode>.
    </p>
  </div>
);

export default Info;
