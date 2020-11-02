import React from "react";
import {
  StoryHeader,
  StoryCode,
} from "../../../../../.storybook/style/storybook-info.styles";

const info = (
  <div>
    <StoryHeader>Date Range Component</StoryHeader>
    <p>Captures a start and end date.</p>
    <StoryHeader>Implementation</StoryHeader>
    <StoryCode>
      import DateRange from \'carbon-react/lib/components/DateRange\';
    </StoryCode>

    <p>To render a Date Range</p>
    <StoryCode>{'<DateRange name="myDateRange" />'}</StoryCode>
  </div>
);

export default info;
