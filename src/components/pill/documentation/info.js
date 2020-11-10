import React from "react";
import {
  StoryHeader,
  StoryCode,
} from "../../../../.storybook/style/storybook-info.styles";

const Info = (
  <div>
    <p>A Pill component.</p>

    <StoryHeader>Implementation</StoryHeader>

    <p>In your file</p>

    <StoryCode padded>
      import Pill from &quot;carbon-react/lib/components/pill.component&quot;
    </StoryCode>

    <p>To render a Pill:</p>

    <StoryCode padded>{'<Pill as="warning">My warning text</Pill>'}</StoryCode>

    <p>Additionally you can pass optional props to the Pill component</p>

    <p>
      &ndash; as: Customizes the appearence of the pill changing the colour (see
      the iconColorSets for possible values).
    </p>
  </div>
);

export default Info;
