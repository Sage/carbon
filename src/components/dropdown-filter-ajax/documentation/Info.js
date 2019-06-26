import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>A dropdown filter widget using ajax.</p>

    <StoryHeader>How to use a dropdown in a component:</StoryHeader>

    <p>In your file</p>

    <StoryCode padded>
      {'import DropdownFilterAjax from "carbon-react/lib/components/dropdown-filter-ajax";'}
    </StoryCode>

    <p>To render a DropdownFilterAjax:</p>

    <StoryCode padded>
      {'<DropdownFilter name="foo" path="/foo" onChange={ myChangeHandler } />'}
    </StoryCode>

    <p>
      {"In 'suggest' mode, the dropdown only shows once a filter term has been entered."}
    </p>

    <p>
      {"You can define a function using the 'create' prop, which allows you to trigger events to create new items."}
    </p>

    <p>You can define the number of rows returned by the ajax request using the property rowsPerRequest.</p>
  </div>
);

export default Info;
