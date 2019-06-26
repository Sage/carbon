import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Decimal</p>
    <StoryHeader>Implementation</StoryHeader>
    <StoryCode>
      {'import Decimal from \'carbon-react/lib/components/decimal\';'}
    </StoryCode>

    <p>To render a Decimal</p>
    <StoryCode>{'<Decimal name="myDecimal" />'}</StoryCode>
  </div>
);

export default info;
