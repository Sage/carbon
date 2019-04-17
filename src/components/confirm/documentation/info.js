import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const code = `<Confirm
  title='Are you sure?'
  onConfirm={ customConfirmHandler }
  onCancel={ customCancelHandler }
  open={ false }
  This is the content message
</Confirm>`;

const info = (
  <div>
    <p>Confirm component</p>
    <StoryHeader>Implementation</StoryHeader>

    <StoryCode padded>
      {'import Confirm from \'carbon-react/lib/components/confirm\';'}
    </StoryCode>

    <p>To render a Confirm:</p>
    <StoryCodeBlock>
      {code}
    </StoryCodeBlock>

    <p>The component rendering the Confirm must pass down a prop of <StoryCode padded>open={ true }</StoryCode> to open the confirm dialog.</p>

    <p>You need to provide a custom cancel/confirm event handlers to handle these events via buttons. </p>
  </div>
);

export default info;
