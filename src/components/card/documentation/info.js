import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>A Card component.</p>

    <StoryHeader>How to use the Card component:</StoryHeader>

    <p>In your file</p>

    <StoryCode padded>
      import Card from &quot;carbon-react/lib/components/card&quot;;
    </StoryCode>

    <p>To render a simple Card:</p>

    <StoryCodeBlock padded>
      {'<Card>'}
      {'  content'}
      {'</Card>'}
    </StoryCodeBlock>

    <p>CardRow and CardColumn components could be used to position the content.</p>
    <p>CardFooter component could be used to render the Card Footer.</p>

    <StoryCodeBlock padded>
      {'<Card>'}
      {'  <CardRow>'}
      {'    <CardColumn>content1</CardColumn>'}
      {'    <CardColumn>content2</CardColumn>'}
      {'  </CardRow>'}
      {'  <CardFooter>'}
      {'    <CardColumn>footer content 1</CardColumn>'}
      {'    <CardColumn>footer content 2</CardColumn>'}
      {'  </CardFooter>'}
      {'</Card>'}
    </StoryCodeBlock>

  </div>
);

export default Info;
