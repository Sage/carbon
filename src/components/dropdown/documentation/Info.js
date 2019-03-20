import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>A dropdown widget.</p>

    <StoryHeader>How to use a dropdown in a component:</StoryHeader>

    <p>In your file</p>

    <StoryCode padded>
      {'import Dropdown from "carbon-react/lib/components/dropdown";'}
    </StoryCode>

    <p>To render a Dropdown:</p>

    <StoryCode padded>
      {'<Dropdown name="foo" options={ foo } onChange={ myChangeHandler } />'}
    </StoryCode>

    <p>The developer should pass data to the store as JSON. e.g.</p>

    <StoryCode padded>
      {'foo: [{ id: 1, name: "Foo" }, { id: 2, name: "Bar" }]'}
    </StoryCode>
  </div>
);

export default Info;
