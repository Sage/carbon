import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>An Icon widget.</p>

    <StoryHeader>How to use an Icon in a component:</StoryHeader>

    <p>In your file</p>

    <StoryCode padded>
      {'import Icon from "carbon-react/lib/components/icon";'}
    </StoryCode>

    <p>To render an Icon:</p>

    <StoryCode padded>
      {'<Icon type="foo" />'}
    </StoryCode>

    <p>
      {"'type' is a required prop"}
    </p>

    {/* eslint-disable-next-line */}
    <p>This widget follows the <a href="https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components">Stateless Functional Component</a> pattern.</p>
  </div>
);

export default Info;
