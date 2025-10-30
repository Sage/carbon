import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import React from "react";

import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverMenu,
} from ".";

import Box from "../box";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

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

    await userEvent.click(actionPopoverToggle[0]);
    await expect(
      await within(document.body).findByText("Email Invoice"),
    ).toBeVisible();
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
ClickToToggle.parameters = { chromatic: { disableSnapshot: true } };
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

    await userEvent.click(actionPopoverToggle[0]);
    await expect(
      await within(document.body).findByText("Email Invoice"),
    ).toBeVisible();
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
CloseOnOutsideClick.parameters = { chromatic: { disableSnapshot: true } };
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

    await userEvent.click(actionPopoverToggle[0]);
    await expect(
      await within(document.body).findByText("Email Invoice"),
    ).toBeVisible();
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
CloseOnEscPress.parameters = { chromatic: { disableSnapshot: true } };
CloseOnEscPress.storyName = "Close On ESC Press";

export const SubmenuHover: Story = {
  render: () => (
    <Box mt={40} height={275}>
      <ActionPopover onOpen={() => {}} onClose={() => {}}>
        <ActionPopoverItem disabled icon="graph" onClick={() => {}}>
          Business
        </ActionPopoverItem>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="print" onClick={() => {}} submenu={submenu}>
          Print Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="pdf" onClick={() => {}}>
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
    const canvas = within(canvasElement);
    const actionPopoverButtons = canvas.getAllByRole("button");
    await userEvent.click(actionPopoverButtons[0]);

    const elementWithSubmenu = await within(document.body).findByText(
      "Print Invoice",
    );
    await userEvent.hover(elementWithSubmenu, { delay: 200 });
    await expect(
      await within(document.body).findByText("Sub Menu 1"),
    ).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};

SubmenuHover.parameters = {
  chromatic: { disableSnapshot: false },
};
