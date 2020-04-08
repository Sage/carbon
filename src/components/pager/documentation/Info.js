import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  (
    <div>
      <p>A Pager widget.</p>

      <StoryHeader>Implementation</StoryHeader>

      <p>In your file</p>

      <StoryCode padded>
        import Pager from &quot;carbon-react/lib/components/pager&quot;;
      </StoryCode>

      <p>To render a Pager:</p>

      <StoryCode padded>
        {'<Pager currentPage="1" totalRecords="100" onPagination={ function(){} } />'}
      </StoryCode>
    </div>
  )
);

export default Info;
