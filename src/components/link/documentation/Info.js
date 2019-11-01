import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>A link widget.</p>

    <StoryHeader>How to use a Link in a component:</StoryHeader>

    <p>In your file:</p>

    <StoryCode padded>
      {'import Link from "carbon-react/lib/components/link";'}
    </StoryCode>

    <p>To render the Link:</p>

    <StoryCode>
      {'<Link href="foo">Main Page</Link>'}
    </StoryCode>

    <p>For additional properties specific to this component, see propTypes.</p>
  </div>
);

export default Info;
