import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Toast</p>
    <StoryHeader>Implementation</StoryHeader>
    <p>Import the component</p>
    <StoryCode>import Toast from &quot;carbon-react/lib/components/toast&quot;</StoryCode>
    <p> Additionally you can pass optional props to the Toast component</p>

    <p><StoryCode padded> as</StoryCode> Customizes the appearance of the toast changing the colour
      (see the &quot;iconColorSets&quot; for possible values).
    </p>

  </div>
);

export default info;
