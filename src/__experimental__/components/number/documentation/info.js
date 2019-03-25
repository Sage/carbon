import React from 'react';
import { StoryHeader, StoryCode } from '../../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>A number widget.</p>

    <p>It only allows entering of a whole number with an optional minus sign.</p>

    <p>All propTypes are inherited from the Textbox component.</p>

    <StoryHeader>Implementation</StoryHeader>

    <p>In your file</p>

    <StoryCode padded>
      {'import Number from "carbon-react/lib/components/number";'}
    </StoryCode>

    <p>To render a Number:</p>

    <StoryCode padded>
      {'<Number name="myNumber" />'}
    </StoryCode>
  </div>
);

export default Info;
