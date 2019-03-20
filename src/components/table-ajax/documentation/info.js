import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Table Ajax component</p>

    <StoryHeader>Implementation</StoryHeader>
    <StoryCodeBlock>
      {'import Table from "carbon-react/lib/components/table-ajax"'}
      {'import { TableRow, TableCell, TableHeader } from "carbon-react/lib/components/table"'}
    </StoryCodeBlock>

    <p>
      To render a<StoryCode padded> {'Table'} </StoryCode>
      please see the
      <StoryCode padded> {'Table'} </StoryCode>
      component
    </p>

    <p>
      <StoryCode padded> {'Table'} </StoryCode>
      requires a<StoryCode padded> {'path'} </StoryCode>
      to be provided
    </p>
  </div>
);

export default info;
