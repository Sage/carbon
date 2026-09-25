import { StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect, waitFor } from "storybook/test";
import React, { useState, useRef } from "react";

import Sidebar from ".";
import Button from "../button";
import Box from "../box";
import Textbox from "../textbox";
import Toast from "../toast";

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

const SidebarBackgroundScroll = () => {
  const [value, setValue] = useState("");
  const firstToastRef = useRef<HTMLDivElement>(null);
  const secondToastRef = useRef<HTMLDivElement>(null);

  return (
    <Box height="2000px" position="relative">
      <Box
        data-role="offscreen-background-content"
        height="100px"
        position="absolute"
        bottom="0px"
      >
        I should not be scrolled into view
      </Box>
      <Sidebar
        aria-label="sidebar"
        open
        onCancel={() => undefined}
        focusableContainers={[firstToastRef, secondToastRef]}
      >
        <Textbox
          label="Textbox"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Sidebar>
      <Toast
        open
        onDismiss={() => undefined}
        ref={firstToastRef}
        targetPortalId="stacked"
        disableAutoFocus
      >
        Toast message 1
      </Toast>
      <Toast
        open
        onDismiss={() => undefined}
        ref={secondToastRef}
        targetPortalId="stacked"
        disableAutoFocus
      >
        Toast message 2
      </Toast>
    </Box>
  );
};

const expectBackgroundNotToScroll = (
  offscreenContent: HTMLElement,
  initialScrollPosition: number,
) => {
  const storyWindow = offscreenContent.ownerDocument.defaultView;

  expect(storyWindow?.scrollY).toBe(initialScrollPosition);
  expect(offscreenContent.getBoundingClientRect().top).toBeGreaterThanOrEqual(
    storyWindow?.innerHeight ?? 0,
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

export const BackgroundScrollWhenFocusWraps: Story = {
  render: () => <SidebarBackgroundScroll />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const storyWindow = canvasElement.ownerDocument.defaultView;
    const offscreenContent = canvas.getByText(
      "I should not be scrolled into view",
    );
    const sidebarCloseButton = await waitFor(() => {
      const closeButton = canvasElement.ownerDocument.querySelector(
        '[data-element="sidebar"] [data-element="close"]',
      );

      expect(closeButton).not.toBeNull();
      return closeButton as HTMLElement;
    });
    const textbox = canvasElement.ownerDocument.querySelector(
      '[data-element="sidebar"] input',
    ) as HTMLElement;
    const toastCloseButtons = Array.from(
      canvasElement.ownerDocument.querySelectorAll(
        '[data-component="toast"] button[data-element="close"]',
      ),
    ) as HTMLElement[];

    storyWindow?.scrollTo(0, 0);
    const initialScrollPosition = storyWindow?.scrollY ?? 0;

    expect(textbox).not.toBeNull();
    expect(toastCloseButtons).toHaveLength(2);

    sidebarCloseButton.focus();
    await expect(sidebarCloseButton).toHaveFocus();

    await userEvent.tab();
    await waitFor(() => expect(textbox).toHaveFocus());
    await userEvent.tab();
    await waitFor(() => expect(toastCloseButtons[0]).toHaveFocus());
    await userEvent.tab();
    await waitFor(() => expect(toastCloseButtons[1]).toHaveFocus());
    await userEvent.tab();
    await waitFor(() => expect(sidebarCloseButton).toHaveFocus());
    expectBackgroundNotToScroll(offscreenContent, initialScrollPosition);

    await userEvent.tab({ shift: true });
    await waitFor(() => expect(toastCloseButtons[1]).toHaveFocus());
    await userEvent.tab({ shift: true });
    await waitFor(() => expect(toastCloseButtons[0]).toHaveFocus());
    await userEvent.tab({ shift: true });
    await waitFor(() => expect(textbox).toHaveFocus());
    await userEvent.tab({ shift: true });
    await waitFor(() => expect(sidebarCloseButton).toHaveFocus());
    expectBackgroundNotToScroll(offscreenContent, initialScrollPosition);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

BackgroundScrollWhenFocusWraps.storyName =
  "Background Does Not Scroll When Focus Wraps";
BackgroundScrollWhenFocusWraps.parameters = {
  chromatic: { disableSnapshot: true },
};
