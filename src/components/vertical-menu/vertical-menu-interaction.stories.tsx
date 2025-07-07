import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import {
  VerticalMenu,
  VerticalMenuItem,
  VerticalMenuFullScreen,
  VerticalMenuTrigger,
} from ".";
import Pill from "../pill";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";

type Story = StoryObj<typeof VerticalMenu>;

export default {
  title: "Vertical Menu/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const ClickToOpenSubmenu: Story = {
  render: () => (
    <VerticalMenu aria-label="Default vertical menu">
      <VerticalMenuItem
        iconType="analysis"
        adornment={
          <Pill borderColor="#fff" fill size="S">
            10
          </Pill>
        }
        title="Item 1"
        href="#"
      />
      <VerticalMenuItem href="#" title="Item 2" />
      <VerticalMenuItem iconType="home" title="Item 3">
        <VerticalMenuItem title="ChildItem 1" href="#" />
        <VerticalMenuItem title="ChildItem 2" href="#" />
      </VerticalMenuItem>
      <VerticalMenuItem
        iconType="calendar"
        title="Item 4 - More text to wrap the whole title. More text to wrap the whole title. More text to wrap the whole title."
      >
        <VerticalMenuItem title="ChildItem 1" href="/child-item-1" />
        <VerticalMenuItem title="ChildItem 2" href="/child-item-2" />
      </VerticalMenuItem>
    </VerticalMenu>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const submenuToggle = canvas.getByRole("button", { name: /item 3/i });

    await userEvent.click(submenuToggle);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
ClickToOpenSubmenu.storyName = "Click To Open Submenu";

export const NavigateToOpenSubmenu: Story = {
  render: () => (
    <VerticalMenu aria-label="Default vertical menu">
      <VerticalMenuItem
        iconType="analysis"
        adornment={
          <Pill borderColor="#fff" fill size="S">
            10
          </Pill>
        }
        title="Item 1"
        href="#"
      />
      <VerticalMenuItem href="#" title="Item 2" />
      <VerticalMenuItem iconType="home" title="Item 3">
        <VerticalMenuItem title="ChildItem 1" href="#" />
        <VerticalMenuItem title="ChildItem 2" href="#" />
      </VerticalMenuItem>
      <VerticalMenuItem
        iconType="calendar"
        title="Item 4 - More text to wrap the whole title. More text to wrap the whole title. More text to wrap the whole title."
      >
        <VerticalMenuItem title="ChildItem 1" href="/child-item-1" />
        <VerticalMenuItem title="ChildItem 2" href="/child-item-2" />
      </VerticalMenuItem>
    </VerticalMenu>
  ),
  play: async () => {
    if (!allowInteractions()) {
      return;
    }

    await userEvent.tab(); // focus item 1
    await userEvent.tab(); // focus item 2
    await userEvent.tab(); // focus item 3
    await userEvent.tab(); // focus item 4
    await userEvent.keyboard("{Enter}"); // open item 4 submenu
    await userInteractionPause(100);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
NavigateToOpenSubmenu.storyName = "Navigate To Open Submenu";

const FullScreenMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <VerticalMenuTrigger onClick={() => setIsMenuOpen(true)}>
        Menu
      </VerticalMenuTrigger>
      <VerticalMenuFullScreen isOpen={isMenuOpen} onClose={() => {}}>
        <VerticalMenuItem
          iconType="analysis"
          adornment={
            <Pill borderColor="#fff" fill size="S">
              10
            </Pill>
          }
          title="Item 1"
          href="#"
        />
        <VerticalMenuItem href="#" title="Item 2" />
        <VerticalMenuItem iconType="home" title="Item 3">
          <VerticalMenuItem title="ChildItem 1" href="#" />
          <VerticalMenuItem title="ChildItem 2" href="#" />
        </VerticalMenuItem>
        <VerticalMenuItem
          iconType="calendar"
          title="Item 4 - More text to wrap the whole title. More text to wrap the whole title. More text to wrap the whole title."
        >
          <VerticalMenuItem title="ChildItem 1" href="/child-item-1" />
          <VerticalMenuItem title="ChildItem 2" href="/child-item-2" />
        </VerticalMenuItem>
      </VerticalMenuFullScreen>
    </>
  );
};

export const ClickToOpenFullScreen: Story = {
  render: () => <FullScreenMenu />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const menuToggle = canvas.getByRole("button");

    await userEvent.click(menuToggle);
    await userInteractionPause(1000); // Pause to allow the full screen menu to open
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
ClickToOpenFullScreen.storyName = "Click To Open FullScreen";

export const NavigateFullScreen: Story = {
  render: () => <FullScreenMenu />,
  play: async () => {
    if (!allowInteractions()) {
      return;
    }

    await userEvent.tab();
    await userEvent.keyboard("{Enter}"); // open full screen menu
    await userInteractionPause(1000); // Pause to allow the full screen menu to open

    await userEvent.tab(); // focus close button
    await userEvent.tab(); // focus item 1
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
ClickToOpenFullScreen.storyName = "Click To Open FullScreen";
