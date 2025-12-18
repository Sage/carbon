import React from "react";
import { StoryFn, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import Breadcrumbs from "./breadcrumbs.component";
import Box from "../box";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import { Crumb } from "./crumb";

type Story = StoryObj<typeof Breadcrumbs>;

export default {
  title: "Breadcrumbs/Interactions",
  component: Breadcrumbs,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [(StoryToRender: StoryFn) => <StoryToRender />],
};

export const DefaultBreadcrumbs: Story = {
  render: () => (
    <Breadcrumbs>
      <Crumb href="#">Breadcrumb 1</Crumb>
      <Crumb href="#">Breadcrumb 2</Crumb>
      <Crumb href="#" isCurrent>
        Current Page
      </Crumb>
    </Breadcrumbs>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    await userEvent.tab();
    await userEvent.tab();
    const firstLink = canvas.getByRole("link", { name: "Breadcrumb 2" });
    await expect(firstLink).toHaveFocus();
  },
};

export const DarkBackground: Story = {
  render: () => (
    <Box p={2} bg="#000">
      <Breadcrumbs isDarkBackground>
        <Crumb href="#">Breadcrumb 1</Crumb>
        <Crumb href="#">Breadcrumb 2</Crumb>
        <Crumb href="#">Breadcrumb 3</Crumb>
        <Crumb href="#" isCurrent>
          Current Page
        </Crumb>
      </Breadcrumbs>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    await userEvent.tab();
    const firstLink = canvas.getByRole("link", { name: "Breadcrumb 1" });
    await expect(firstLink).toHaveFocus();
  },
};
