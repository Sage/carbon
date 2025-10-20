import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import React, { useState, useRef } from "react";

import Sidebar from ".";
import Button from "../button";
import Box from "../box";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof Sidebar>;

const BasicSidebar = ({ children }: { children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        mt={2}
        ml={2}
        mr={2}
        buttonType="primary"
      >
        Focus
      </Button>
      <Sidebar
        aria-label="sidebar"
        data-role="target"
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setTimeout(() => buttonRef.current?.focus(), 0);
        }}
      >
        <Box mb={2}>{children}</Box>
      </Sidebar>
    </>
  );
};

export default {
  title: "Sidebar/Interactions",
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
    <>
      <Button buttonType="secondary" mt={2}>
        {" "}
        No Focus
      </Button>
      <BasicSidebar>
        Content
        <Button buttonType="primary" ml={2}>
          Button
        </Button>
      </BasicSidebar>
      <Button buttonType="secondary" mt={2}>
        {" "}
        No Focus
      </Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const button = canvas.getAllByRole("button");

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard("{Enter}", { delay: 500 });
    await expect(
      await within(document.body).findByText("Content"),
    ).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect(button[1]).toHaveFocus();
    await userEvent.click(button[1]);
    await expect(
      await within(document.body).findByText("Content"),
    ).toBeVisible();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await expect(button[1]).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(
      await within(document.body).findByText("Content"),
    ).toBeVisible();
    await userEvent.tab();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
Focus.storyName = "Focus Trap";

export const Scroll: Story = {
  render: () => (
    <BasicSidebar>
      <Box mt="600px">
        <Button mt="600px" buttonType="primary">
          Button
        </Button>
      </Box>
    </BasicSidebar>
  ),
  play: async () => {
    if (!allowInteractions()) {
      return;
    }

    await userEvent.tab();
    await userEvent.keyboard("{Enter}", { delay: 500 });
    const button = within(document.body).getAllByRole("button");
    button[1].scrollIntoView({ behavior: "smooth" });
    await expect(button[1]).toBeVisible();
    await userEvent.click(button[1]);
    await expect(button[1]).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
Scroll.storyName = "Scroll";
