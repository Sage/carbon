import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>

    <StoryHeader>How to use the ActionPopover component</StoryHeader>

    <p>Import the component</p>

    <StoryCode padded>
      {'import {ActionPopover, ActionPopoverItem, ActionPopoverDivider} from '}
      {'"carbon-react/lib/components/action-popover";'}
    </StoryCode>

    <p>See the story source for an example on how to define a ActionPopover</p>
    <ul>
      <li>ActionPopoverItem&apos;s can be disabled</li>
      <li>Use ActionPopoverDivider to display a divider</li>
      <li>ActionPopover and ActionPopoverItem have extensive keyboard support
        <ul>
          <li>ActionPopover
            <ul>
              <li>DownArrow, Space, Enter opens the menu and selects the first item</li>
              <li>UpArrow opens the menu and selects the last item</li>
            </ul>
          </li>
          <li>ActionPopoverItem
            <ul>
              <li>Enter calls the onClick handler, closes the menu and focuses ActionPopover unless Item is disabled
              </li>
              <li>Tab closes the menu and focuses the next focusable element</li>
              <li>Shift+Tab closes the menu and focuses the previous focusable element, <em>not ActionPopover</em></li>
              <li>Escape closes the menu and focuses the ActionPopover</li>
              <li>DownArrow focuses the next Item, or the first Item if focus is already at the end of the menu</li>
              <li>UpArrow focuses the previous Item, or the last Item if focus is already at the start of the menu</li>
              <li>Home focuses the first Item</li>
              <li>End focuses the last Item</li>
              <li>Space does nothing</li>
              <li>a-z selects the next item in the list starting with that letter, wrapping around to the start if
                required
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
);

export default Info;
