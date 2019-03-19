import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const code = `<Confirm
  title="Are you sure?"
  onConfirm={ customConfirmHandler }
  onCancel={ customCancelHandler }
  open={ false }
  This is the content message
</Confirm>`;

const info = (
  <div>
    <p>Confirm</p>
    <StoryHeader>Confirms or cancels an action.</StoryHeader>
    <StoryCode>
      {'mport Confirm from \'carbon-react/lib/components/confirm\';'}
    </StoryCode>

    <p>To render a Confirm</p>
    <StoryCodeBlock>
      {code}
    </StoryCodeBlock>
  </div>
);

export default info;
