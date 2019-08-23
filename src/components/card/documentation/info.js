import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>A Card component.</p>

    <StoryHeader>How to use the Card component:</StoryHeader>

    <p>
      {'Card is rendered as...'}
    </p>

    <p>In your file</p>

    <StoryCode padded>
      {'import Card from "carbon-react/lib/components/card";'}
    </StoryCode>

    <p>To render a Card:</p>

    <StoryCode padded>
      {'<Card />'}
    </StoryCode>

    <p>
      {'By default, the card renders with text-align:center'}
    </p>

    <p>
      More instructions to override defaults here.
    </p>

    <StoryCode padded>
      {'<Card headerAlign="left" middleAlign="right" footerAlign="left" border=true />'}
    </StoryCode>

    <p>The Card can also be rendered with the following:</p>

    <ul>
      <li>
        {'list of things here'}
      </li>
    </ul>
  </div>
);

export default Info;
