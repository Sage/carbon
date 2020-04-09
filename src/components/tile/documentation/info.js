import React from 'react';
import {
  StoryHeader, StoryCode, StoryCodeBlock
} from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Tile component</p>
    <StoryHeader> Implementation</StoryHeader>
    <StoryCode>
      import Tile from &quot;carbon-react/lib/components/tile&quot;
    </StoryCode>

    <p>
      To create a Tile, render a Tile component containing the child content you
      wish to be displayed inside the Tile.
    </p>
    <StoryCodeBlock>
      {'<Checkbox name="myCheckbox" />'}
      {'<Tile>'}
      {'  <Content title="Test Title One">'}
      {'    Test Body One'}
      {'  </Content>'}
      {'  <Content title="Test Title Two">'}
      {'    Test Body Two'}
      {'  </Content>'}
      {'  <Content title="Test Title Three">'}
      {'    Test Body Three'}
      {'  </Content>'}
      {'</Tile>'}
    </StoryCodeBlock>
    <p>
      Any child wrapped by a Tile component can be passed an optional `width` prop - this is
      a percent value, dictating the width of the child element within the tile. It will not
      have any effect if the Tile orientation is set to `vertical`.
    </p>
  </div>
);

export default info;
