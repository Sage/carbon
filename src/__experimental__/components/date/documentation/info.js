import React from "react";
import {
  StoryHeader,
  StoryCode,
} from "../../../../../.storybook/style/storybook-info.styles";

const info = (
  <div>
    <StoryHeader>Date Input Component</StoryHeader>
    <p>Captures a single date.</p>
    <StoryHeader>Implementation</StoryHeader>
    <StoryCode>
      import DateInput from \'carbon-react/lib/components/Date\';
    </StoryCode>

    <p>To render a Date Input</p>
    <StoryCode>{'<Date name="myDate" />'}</StoryCode>
  </div>
);

export default info;
