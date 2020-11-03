import React from "react";
import {
  StoryHeader,
  StoryCode,
} from "../../../../../.storybook/style/storybook-info.styles";

const Info = (
  <div>
    <StoryHeader>Number Input</StoryHeader>

    <p>Capture whole numbers - without a decimal point.</p>

    <p>All propTypes are inherited from the Textbox component.</p>

    <StoryHeader>Implementation</StoryHeader>

    <p>In your file</p>

    <StoryCode padded>
      import Number from &quot;carbon-react/lib/components/number&quot;;
    </StoryCode>

    <p>To render a Number:</p>

    <StoryCode padded>{'<Number name="myNumber" />'}</StoryCode>
  </div>
);

export default Info;
