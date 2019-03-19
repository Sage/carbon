import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p> Settings Row Component </p>
    <p> SettingsRow implements our UX design for settings pages.</p>

    <p>
      It accepts a <StoryCode padded>title</StoryCode> string to be displayed at the top left of the row. The
      <StoryCode padded>description</StoryCode> property accepts a string or JSX object to support flexible layout of
      elements (e.g. Links, bolded text, paragraphs) in the header column under the title. The default divider line at
      the bottom of the row may be disabled by setting <StoryCode padded>{'divider={ false }'}.</StoryCode>
      All children are rendered in the input column to the right of the header column.
    </p>

    <StoryHeader> Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import SettingsRow from {'"carbon-react/lib/components/settings-row"'}</StoryCode>

    <p>To render the SettingsRow:</p>
    <StoryCodeBlock>
      {'<SettingsRow title="My Setting" description="My description">'}
      {' <Checkbox label="Enable my setting" />'}
      {' <span>Other content to go with input</span>'}
      {'</SettingsRow>'}
    </StoryCodeBlock>
  </div>
);

export default info;
