import React from "react";
import {
  StoryHeader,
  StoryCode,
} from "../../../../../.storybook/style/storybook-info.styles";

const info = (
  <div>
    <StoryHeader>Decimal Input</StoryHeader>
    <p>Captures a number with a decimal point, or a currency value.</p>
    <StoryHeader>Implementation</StoryHeader>
    <StoryCode>
      import Decimal from \'carbon-react/lib/components/decimal\';
    </StoryCode>

    <p>To render a Decimal</p>
    <StoryCode>{'<Decimal name="myDecimal" />'}</StoryCode>
  </div>
);

export default info;
