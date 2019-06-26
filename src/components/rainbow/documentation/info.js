import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const code = `
let myImmutableData = Immutable.fromJS([
  { 
    y: 30,
    name: "First Bit",
    label: "label for first bit",
    tooltip: "more info about this bit",
    color: "#000"
  }, {
    y: 70,
    name: "Second Bit",
    label: "label for second bit",
    tooltip: "more info about this bit"
  }
 ]);
`;

const info = (
  <div>
    <p>Rainbow Component </p>
    <p>A rainbow chart using the Highcharts API.</p>

    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import Rainbow from {'"carbon-react/lib/components/rainbow"'}</StoryCode>

    <p>
      Note that the Rainbow component expects that you already have the Highcharts library loaded. This may be true in
      case of some projects, which already have that library available for their legacy code. In other cases, you would
      need to import Highcharts before importing Rainbow:
    </p>

    <StoryCode padded>import {"'react-highcharts/dist/bundle/highcharts';"}</StoryCode>

    <p>To render the Rainbow:</p>
    <StoryCodeBlock>{code}</StoryCodeBlock>
    <StoryCode>{'<Rainbow title="My Chart" data={ myImmutableData } />'}</StoryCode>
  </div>
);

export default info;
