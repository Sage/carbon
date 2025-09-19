// src/components/anchor-navigation/anchor-navigation-interactions.stories.tsx
import React from "react";
import { StoryObj, StoryFn } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import AnchorNavigation from "./anchor-navigation.component";
import { DefaultStory } from "./anchor-navigation.stories";

import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";

type Story = StoryObj<typeof AnchorNavigation>;

export default {
  title: "Anchor Navigation/Interactions",
  component: AnchorNavigation,
  parameters: {
    info: { disable: true },
    chromatic: { disableSnapshot: true },
  },
} as const;

const RenderFromDefault: StoryFn = () =>
  (DefaultStory as unknown as () => JSX.Element)();

export const NavFocusManagement: Story = {
  render: RenderFromDefault,
  play: async () => {
    if (!allowInteractions()) return;

    await userEvent.tab();
    await userInteractionPause(50);

    await userEvent.tab();
    await userInteractionPause(50);
  },
  decorators: [
    (StoryToRender: StoryFn) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
NavFocusManagement.storyName = "Focus Management";
NavFocusManagement.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const ScrollAndFocusInput: Story = {
  render: RenderFromDefault,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const links = canvas.getAllByRole("link");

    const targetLink = links[1] ?? links[0];
    await userEvent.click(targetLink);
    await userInteractionPause(300);

    await userEvent.tab();
    await userInteractionPause(100);
  },
  decorators: [
    (StoryToRender: StoryFn) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
ScrollAndFocusInput.storyName = "Scroll and Focus Input";
ScrollAndFocusInput.parameters = {
  storyId: "anchor-navigation-interactions--click-scroll-and-tab-into-section",
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};
