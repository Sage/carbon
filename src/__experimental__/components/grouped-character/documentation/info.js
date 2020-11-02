import React from "react";
import {
  StoryHeader,
  StoryCode,
} from "../../../../../.storybook/style/storybook-info.styles";

const info = (
  <div>
    <StoryHeader>Grouped Character Component</StoryHeader>
    <StoryHeader>Implementation</StoryHeader>
    <StoryCode>
      import GroupedCharacter from
      \'carbon-react/lib/components/grouped-character\';
    </StoryCode>

    <p>To render a Grouped Character</p>
    <StoryCode>{'<GroupedCharacter name="myGroupedCharacter" />'}</StoryCode>
  </div>
);

export default info;
