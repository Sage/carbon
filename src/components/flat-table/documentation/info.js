import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>Flat Table component</p>
    <p>Renders a data table based on provided data.</p>

    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>

    <StoryCode padded>import FlatTable from {'"react-carbon/lib/components/flat-table"'}</StoryCode>

    <p>To render a portrait:</p>

    <StoryCode>{'<FlatTable tableData="configObject" />'}</StoryCode>

    <p>
      <StoryCode>configObject</StoryCode> should contain properties:
    </p>
    <ul>
      <li><StoryCode>headData</StoryCode> - an array of objects that define the head of the table</li>
      <li><StoryCode>bodyData</StoryCode> - an array of objects that define rows in table body</li>
      <li><StoryCode>availableColumns</StoryCode> -
        optional property which is an array of object keys
        defined in the <StoryCode>headData</StoryCode> and <StoryCode>bodyData</StoryCode>, <br />
        omitting a key will cause the column to not render
      </li>
    </ul>
  </div>
);

export default Info;
