import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p> Row Component </p>
    <p> A row widget. Sets up a basic column-based UI layout.</p>

    <StoryHeader> Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>
      import {'{ Row, Column }'} from {'"carbon-react/lib/components/row"'}
    </StoryCode>

    <p>To render the Row:</p>
    <StoryCodeBlock>
      {'<Row>'}
      {'<Column>Column1</Column>'}
      {'<Column>Column2</Column>'}
      {'</Row>'}
    </StoryCodeBlock>

    <p>A Rows child must be of type Column.</p>
  </div>
);

export default info;
