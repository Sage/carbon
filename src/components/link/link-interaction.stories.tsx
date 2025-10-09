import React from "react";
import { StoryObj } from "@storybook/react";
import { within, expect, userEvent } from "@storybook/test";

import Link from ".";
import Box from "../box";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof Link>;

export default {
  title: "Link/Interactions",
  parameters: {
    info: { disable: true },
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export const Focus: Story = {
  render: () => (
    <Box width="max-content" display="flex" flexDirection="column" gap="32px">
      <Link href="https://carbon.sage.com" target="_blank" data-role="target">
        Typical link
      </Link>
      <Link disabled>Disabled link</Link>
      <Link
        href="https://carbon.sage.com"
        target="_blank"
        variant="negative"
        data-role="target"
      >
        Negative link
      </Link>
      <Link
        href="https://carbon.sage.com"
        target="_blank"
        variant="neutral"
        data-role="target"
      >
        Neutral link
      </Link>
      <Link
        href="https://carbon.sage.com"
        target="_blank"
        variant="subtle"
        data-role="target"
      >
        Subtle link
      </Link>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const links = canvas.getAllByRole("link");

    await userEvent.tab();
    await expect(links[0]).toHaveFocus();
    await userEvent.tab();
    await expect(links[1]).toHaveFocus();
    await userEvent.tab();
    await expect(links[2]).toHaveFocus();
    await userEvent.tab();
    await expect(links[3]).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
Focus.storyName = "Focus";
Focus.parameters = {
  pseudo: {
    focus: '[data-role="target"] a',
  },
};

export const FocusDark: Story = {
  render: () => (
    <Box width="max-content" display="flex" flexDirection="column" gap="32px">
      <Box
        backgroundColor="#000000"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="32px"
        padding="20px 10px"
      >
        <Link
          href="https://carbon.sage.com"
          target="_blank"
          inverse
          data-role="target"
        >
          Typical link
        </Link>
        <Link
          href="https://carbon.sage.com"
          target="_blank"
          variant="negative"
          inverse
          data-role="target"
        >
          Negative link
        </Link>
        <Link
          href="https://carbon.sage.com"
          target="_blank"
          variant="neutral"
          inverse
          data-role="target"
        >
          Neutral link
        </Link>
        <Link
          href="https://carbon.sage.com"
          target="_blank"
          variant="subtle"
          inverse
          data-role="target"
        >
          Subtle link
        </Link>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const links = canvas.getAllByRole("link");

    await userEvent.tab();
    await expect(links[0]).toHaveFocus();
    await userEvent.tab();
    await expect(links[1]).toHaveFocus();
    await userEvent.tab();
    await expect(links[2]).toHaveFocus();
    await userEvent.tab();
    await expect(links[3]).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
FocusDark.storyName = "Focus Dark Background";
FocusDark.parameters = {
  pseudo: {
    focus: '[data-role="target"] a',
  },
};

export const Hover: Story = {
  render: () => (
    <Box width="max-content" display="flex" flexDirection="column" gap="32px">
      <Link
        href="#"
        target="_blank"
        data-role="target2"
        onClick={(e) => e.preventDefault()}
      >
        Typical link
      </Link>
      <Link
        href="#"
        target="_blank"
        variant="negative"
        data-role="target2"
        onClick={(e) => e.preventDefault()}
      >
        Negative link
      </Link>
      <Link
        href="#"
        target="_blank"
        variant="neutral"
        data-role="target2"
        onClick={(e) => e.preventDefault()}
      >
        Neutral link
      </Link>
      <Link
        href="#"
        target="_blank"
        variant="subtle"
        data-role="target2"
        onClick={(e) => e.preventDefault()}
      >
        Subtle link
      </Link>
      <Link disabled>Disabled link</Link>
      <Box
        backgroundColor="#000000"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="32px"
        padding="20px 10px"
      >
        <Link
          href="#"
          target="_blank"
          inverse
          data-role="target2"
          onClick={(e) => e.preventDefault()}
        >
          Typical link
        </Link>
        <Link
          href="#"
          target="_blank"
          variant="negative"
          inverse
          data-role="target2"
          onClick={(e) => e.preventDefault()}
        >
          Negative link
        </Link>
        <Link
          href="#"
          target="_blank"
          variant="neutral"
          inverse
          data-role="target2"
          onClick={(e) => e.preventDefault()}
        >
          Neutral link
        </Link>
        <Link
          href="#"
          target="_blank"
          variant="subtle"
          inverse
          data-role="target2"
          onClick={(e) => e.preventDefault()}
        >
          Subtle link
        </Link>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const links = canvas.getAllByRole("link");

    await userEvent.click(links[0]);
    await expect(links[0]).toHaveFocus();
    await userEvent.click(links[1]);
    await expect(links[1]).toHaveFocus();
    await userEvent.click(links[2]);
    await expect(links[2]).toHaveFocus();
    await userEvent.click(links[3]);
    await expect(links[3]).toHaveFocus();
    await userEvent.click(links[4]);
    await expect(links[4]).toHaveFocus();
    await userEvent.click(links[5]);
    await expect(links[5]).toHaveFocus();
    await userEvent.click(links[6]);
    await expect(links[6]).toHaveFocus();
    await userEvent.click(links[7]);
    await expect(links[7]).toHaveFocus();
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
Hover.storyName = "Hover";
Hover.parameters = {
  pseudo: {
    hover: '[data-role="target2"] a',
  },
};

export const IsSkipLink: Story = {
  render: () => <Link href="#main-content" isSkipLink />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const links = canvas.getByRole("link");

    await userEvent.tab();
    await expect(links).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
IsSkipLink.storyName = "Skip Link";
