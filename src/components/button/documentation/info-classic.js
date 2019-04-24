import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const InfoClassic = (
  <div>
    <p>A Legacy Button component.</p>

    <StoryHeader>How to use the Button component:</StoryHeader>

    <p>
      {'Button is rendered as one of "primary" and "secondary"'}
    </p>

    <p>In your file</p>

    <StoryCode padded>
      {'import Button from "carbon-react/lib/components/button";'}
    </StoryCode>

    <p>To render a Button:</p>

    <StoryCode padded>
      {'<Button>Save</Button>'}
    </StoryCode>

    <p>
      {'By default, the Button renders as with the color and size variants of "secondary" and "medium" size'}
    </p>

    <p>
      To instead have the Button render with a different color and/or size variant, pass in a value to the
      relevant prop as below.
    </p>

    <StoryCode padded>
      {'<Button as="primary" size="large" />'}
    </StoryCode>

    <p>The Button can also be rendered with the following:</p>

    <ul>
      <li>
        {'with a "subtext" string, only if the size is set to large'}
      </li>
      <li>
        {'disabled by passing a boolean to the "disabled" prop'}
      </li>
      <li>{'with a child Icon component when the "iconType" and "iconPosition" props are passed in:'}
        <ul>
          <li>
            {'setting the position to "before" will render the Icon before the Button text'}
          </li>
          <li>
            {'setting the position to "after" will render the Icon after the Button text'}
          </li>
        </ul>
      </li>
    </ul>
  </div>
);

export default InfoClassic;
