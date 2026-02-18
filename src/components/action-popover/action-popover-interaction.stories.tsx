import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import React from "react";

import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverMenu,
  ActionPopoverMenuButton,
} from ".";

import Box from "../box";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import { ActionPopoverWithIconsAndNoSubmenus } from "./components.test-pw";

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

export const SubmenuHoverAndFocus: Story = {
  render: () => (
    <>
      <Box mt={40} height={275}>
        <ActionPopover onOpen={() => {}} onClose={() => {}}>
          <ActionPopoverItem disabled icon="graph" onClick={() => {}}>
            Business
          </ActionPopoverItem>
          <ActionPopoverItem icon="email" onClick={() => {}}>
            Email Invoice
          </ActionPopoverItem>
          <ActionPopoverItem
            icon="print"
            onClick={() => {}}
            submenu={submenu}
            data-element="print-invoice"
          >
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
      <Box mt={10} height={10}>
        <ActionPopover onOpen={() => {}} onClose={() => {}} data-role="target">
          <ActionPopoverItem icon="email" onClick={() => {}}>
            email
          </ActionPopoverItem>
        </ActionPopover>
      </Box>
      <Box mt={10} height={10}>
        <ActionPopover
          data-role="target"
          renderButton={({
            tabIndex,
            "data-element": dataElement,
            ariaAttributes,
          }) => (
            <ActionPopoverMenuButton
              buttonType="tertiary"
              iconType="dropdown"
              iconPosition="after"
              size="small"
              tabIndex={tabIndex}
              data-element={dataElement}
              ariaAttributes={ariaAttributes}
            />
          )}
        >
          <ActionPopoverItem icon="email" onClick={() => {}}>
            Email Invoice
          </ActionPopoverItem>
          <ActionPopoverDivider />
          <ActionPopoverItem onClick={() => {}} icon="delete">
            Delete
          </ActionPopoverItem>
        </ActionPopover>
      </Box>
    </>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
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

SubmenuHoverAndFocus.parameters = {
  chromatic: { disableSnapshot: false },
  pseudo: {
    focus: '[data-role="target"] [data-element="action-popover-button"]',
  },
};

export const IconsAndNoSubmenus: Story = {
  render: () => <ActionPopoverWithIconsAndNoSubmenus />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const actionPopoverButtons = canvas.getAllByRole("button");
    await userEvent.click(actionPopoverButtons[0]);

    const menuButton = await within(document.body).findByText("Return Home");
    await expect(menuButton).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};
IconsAndNoSubmenus.parameters = {
  chromatic: { disableSnapshot: false },
};

export const NoIconsAndNoSubmenu: Story = {
  render: () => (
    <Box height={250}>
      <ActionPopover horizontalAlignment="right">
        <ActionPopoverItem onClick={() => {}}>Email Invoice</ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
      </ActionPopover>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const actionPopoverButtons = canvas.getAllByRole("button");
    await userEvent.click(actionPopoverButtons[0]);

    const elementWithSubmenu = await within(document.body).findByText(
      "Email Invoice",
    );
    await expect(elementWithSubmenu).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};
NoIconsAndNoSubmenu.parameters = {
  chromatic: { disableSnapshot: false },
};

export const MenuOpeningAbove: Story = {
  render: () => (
    <Box pt={140} height={250}>
      <ActionPopover placement="top">
        <ActionPopoverItem
          icon="print"
          onClick={() => {}}
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
              <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          Print
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
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
    const actionPopoverButtons = canvas.getAllByRole("button");
    await userEvent.click(actionPopoverButtons[0]);

    const menuButton = await within(document.body).findByText("Print");
    await expect(menuButton).toBeVisible();
    await userEvent.hover(menuButton, { delay: 200 });
    await expect(await within(document.body).findByText("CSV")).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};
MenuOpeningAbove.parameters = {
  chromatic: { disableSnapshot: false },
};
