/* eslint react/jsx-indent: 0 */
import React from 'react';
import { StoryHeader, StoryCode } from '../../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>A dropdown filter widget.</p>

    <StoryHeader>How to use a dropdown in a component:</StoryHeader>

    <p>In your file</p>

    <StoryCode padded>
      import DropdownFilter from &quot;carbon-react/lib/components/dropdown-filter&quot;;
    </StoryCode>

    <p>To render a DropdownFilter:</p>

    <StoryCode padded>
      {'<DropdownFilter name="foo" options={ foo } onChange={ myChangeHandler } />'}
    </StoryCode>

    <p>The developer should pass data to the store as JSON. e.g.</p>

    <StoryCode padded>
      {'foo: [{ id: 1, name: "Foo" }, { id: 2, name: "Bar" }]'}
    </StoryCode>

    <p>
      When using the component in &apos;suggest&apos; mode, the dropdown only shows once a filter term has been entered.
    </p>

    <p>
      In &apos;freetext&apos; mode, the component mimics &apos;suggest&apos;,
       but allows write-in text values as well as list options.
    </p>

    <p>
      Specify an initial write-in value with the &apos;visibleValue&apos; property.
    </p>

    <p>
      Setting the &apos;freetextName&apos; property adds a second hidden input for the write-in value.
    </p>

    <p>
      Otherwise, the &apos;name&apos; property is used for the option id.
    </p>

    <p>
      You can define a function for the &apos;create&apos; prop, which allows you to trigger events to create new items.
    </p>
  </div>
);

export default Info;
