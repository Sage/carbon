import { StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import React from "react";

import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverMenu,
} from ".";

import Box from "../box";

import { allowInteractions } from "../../../.storybook/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";

type Story = StoryObj<typeof ActionPopover>;

const submenu = (
  <ActionPopoverMenu>
    <ActionPopoverItem onClick={() => {}}>Sub Menu 1</ActionPopoverItem>
    <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
    <ActionPopoverItem disabled onClick={() => {}}>
      Sub Menu 3
    </ActionPopoverItem>
  </ActionPopoverMenu>
);

export default {
  title: "Action Popover/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const ClickToToggle: Story = {
  render: () => (
    <Box mt={40} height={275}>
      <ActionPopover onOpen={() => {}} onClose={() => {}}>
        <ActionPopoverItem
          disabled
          icon="graph"
          submenu={submenu}
          onClick={() => {}}
        >
          Business
        </ActionPopoverItem>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="print" onClick={() => {}} submenu={submenu}>
          Print Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="pdf" submenu={submenu} onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>
        <ActionPopoverItem icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem disabled icon="delete" onClick={() => {}}>
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  ),

  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const actionPopoverToggle = canvas.getAllByRole("button");

    await userInteractionPause(1000);
    await userEvent.click(actionPopoverToggle[0]);

    await userInteractionPause(1000);
    await userEvent.click(actionPopoverToggle[0]);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

ClickToToggle.storyName = "Click To Toggle";

export const CloseOnOutsideClick: Story = {
  render: () => (
    <Box mt={40} height={275}>
      <ActionPopover onOpen={() => {}} onClose={() => {}}>
        <ActionPopoverItem
          disabled
          icon="graph"
          submenu={submenu}
          onClick={() => {}}
        >
          Business
        </ActionPopoverItem>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="print" onClick={() => {}} submenu={submenu}>
          Print Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="pdf" submenu={submenu} onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>
        <ActionPopoverItem icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem disabled icon="delete" onClick={() => {}}>
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  ),

  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const actionPopoverToggle = canvas.getAllByRole("button");

    await userInteractionPause(1000);
    await userEvent.click(actionPopoverToggle[0]);

    await userInteractionPause(1000);
    await userEvent.click(document.body);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

CloseOnOutsideClick.storyName = "Close On Outside Click";

export const CloseOnEscPress: Story = {
  render: () => (
    <Box mt={40} height={275}>
      <ActionPopover onOpen={() => {}} onClose={() => {}}>
        <ActionPopoverItem
          disabled
          icon="graph"
          submenu={submenu}
          onClick={() => {}}
        >
          Business
        </ActionPopoverItem>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="print" onClick={() => {}} submenu={submenu}>
          Print Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="pdf" submenu={submenu} onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>
        <ActionPopoverItem icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem disabled icon="delete" onClick={() => {}}>
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  ),

  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const actionPopoverToggle = canvas.getAllByRole("button");

    await userInteractionPause(1000);
    await userEvent.click(actionPopoverToggle[0]);

    await userInteractionPause(1000);
    await userEvent.keyboard("{Escape}");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

CloseOnEscPress.storyName = "Close On ESC Press";
