import React from 'react';
import { StoryHeader, StoryCode } from '../../../../../.storybook/style/storybook-info.styles';

const legacyInfo = (
  <div>
    <p>Legacy Switch component</p>
    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import Switch from &quot;carbon-react/lib/components/switch&quot;</StoryCode>

    <p>This component is disabled when <StoryCode>loading</StoryCode> is set to <StoryCode>true</StoryCode></p>
  </div>
);

export default legacyInfo;
