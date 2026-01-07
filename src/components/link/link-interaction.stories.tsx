import React from "react";
import { StoryObj } from "@storybook/react";
import { within, expect, userEvent } from "@storybook/test";

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

export const Focus: Story = {
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
