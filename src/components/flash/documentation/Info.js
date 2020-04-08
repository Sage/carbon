import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>A Flash widget.</p>

    <StoryHeader>How to use the Flash component:</StoryHeader>

    <p>
      Flash is rendered in two sections: a ventral message &apos;flash&apos;, and a dorsal coloured &apos;slider&apos;.
    </p>

    <p>In your file</p>

    <StoryCode padded>
      import Flash from &quot;carbon-react/lib/components/flash&quot;;
    </StoryCode>

    <p>To render a Flash, setup open and cancel handlers in your view to trigger the message on and off:</p>

    <StoryCode padded>
      {'<Flash open={ openStatus } onDismiss={ myOnDismiss } message="Alert!" />'}
    </StoryCode>

    <p>By default, the flash renders with a clickable close icon that hooks up with the onDismiss function.</p>

    <p>To instead have the flash disappear after a given time period, pass a prop of timeout in milliseconds.</p>

    <StoryCode padded>
      {'<Flash open={ openStatus } onDismiss={ myOnDismiss } message="Alert!" timeout={ 2000 }/>'}
    </StoryCode>

    <p>The flash message can be formatted in the following ways:</p>

    <ul>
      <li>
        A string: &quot;Alert&quot;
      </li>
      <li>
        An array: [&quot;Message One&quot;, &quot;Message Two&quot;]
      </li>
      <li>An object with description: <StoryCode>{'{ description: "My description" }'}</StoryCode></li>
      <li>
        <span>An object of key/value pairs:</span>
        <StoryCode>{'{ first_name: "is required", last_name: "is required" }'}</StoryCode>
      </li>
      <li>An object with description and nested key/value pairs:</li>
    </ul>

    <StoryCode padded>
      {'{ description: { first_name: "is required", last_name: "is required" } }'}
    </StoryCode>

    <p>
      If a message is too long, it can be proxied to a dialog by adding &apos;more&apos; in your description.
    </p>

    <StoryCode padded>
      let message = &quot;This is too long ::more:: This sentence is proxied to a dialog.&quot;
    </StoryCode>
  </div>
);

export default Info;
