import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>A widget for internationalisation of text.</p>

    <StoryHeader>How to use an I18n component:</StoryHeader>

    <p>In your file:</p>

    <StoryCode padded>
      {'import I18n from "carbon-react/lib/components/i18n";'}
    </StoryCode>

    <p>To render the message:</p>

    <StoryCode padded>
      {'<I18n scope="foo" />'}
    </StoryCode>

    <p>For additional properties specific to this component, see propTypes.</p>
  </div>
);

export default Info;
