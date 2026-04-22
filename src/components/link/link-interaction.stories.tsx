import React from "react";
import { StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent, waitFor } from "storybook/test";

import Link from ".";
import Box from "../box";
import { Menu, MenuItem } from "../menu";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof Link>;

export default {
  title: "Link/Interactions",
  component: Link,
  parameters: {
    info: { disable: true },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const FocusAndTooltipHover: Story = {
  render: ({ ...args }) => (
    <Box width="max-content" display="flex" flexDirection="column" gap="32px">
      <Link
        href="https://carbon.sage.com"
        target="_blank"
        data-role="target"
        {...args}
      >
        Typical link
      </Link>
      <br></br>
      <Link
        href="https://carbon.sage.com"
        icon="settings"
        tooltipMessage="This is a tooltip message"
        data-role="tooltip-link"
        {...args}
      >
        Link with tooltip
      </Link>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const link = canvas.getAllByRole("link")[0];

    await userEvent.tab();
    await expect(link).toHaveFocus();

    const icon = canvas.getByTestId("icon");
    await userEvent.hover(icon, { delay: 200 });

    await waitFor(() => {
      const tooltip = canvas.queryByRole("tooltip");
      if (tooltip) {
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent("This is a tooltip message");
      }
    });
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const FocusDark: Story = {
  render: ({ ...args }) => (
    <Box
      p={2}
      width="max-content"
      display="flex"
      flexDirection="column"
      gap="32px"
      backgroundColor="#000000"
    >
      <Link
        href="https://carbon.sage.com"
        target="_blank"
        inverse
        data-role="target"
        {...args}
      >
        Typical link
      </Link>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");

    await userEvent.tab();
    await expect(link).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const IsSkipLink: Story = {
  render: () => (
    <>
      <Link href="#main-content" isSkipLink />
      <Menu>
        <MenuItem href="#">Menu Item 1</MenuItem>
        <MenuItem href="#">Menu Item 2</MenuItem>
      </Menu>
    </>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const links = canvas.getAllByRole("link");

    await userEvent.tab();
    await expect(links[0]).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
