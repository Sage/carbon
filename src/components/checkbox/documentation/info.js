import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Checkbox component</p>
    <StoryHeader> Implementation</StoryHeader>
    <StoryCode>
      {'import Checkbox from "carbon-react/lib/components/checkbox"'}
    </StoryCode>

    <p>To render a Checkbox</p>
    <StoryCode>
      {'<Checkbox name="myCheckbox" />'}
    </StoryCode>
  </div>
);

export default info;
