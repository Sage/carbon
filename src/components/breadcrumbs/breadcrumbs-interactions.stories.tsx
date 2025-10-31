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

    const nav = canvas.getByRole("navigation", { name: /breadcrumb/i });
    expect(nav).toBeInTheDocument();

    const links = canvas.getAllByRole("link");
    expect(links.length).toBe(2);

    await userEvent.tab();
    await expect(links[0]).toHaveFocus();

    await userEvent.tab();
    await expect(links[1]).toHaveFocus();
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

    const firstLink = canvas.getByRole("link", { name: "Breadcrumb 1" });
    await userEvent.hover(firstLink);

    const nav = canvas.getByRole("navigation", { name: /breadcrumb/i });
    await expect(nav).toBeInTheDocument();

    await userEvent.tab();
    await expect(firstLink).toHaveFocus();
  },
};

export const LongTrailBreadcrumbs: Story = {
  render: () => (
    <Breadcrumbs>
      <Crumb href="#">Breadcrumb 1</Crumb>
      <Crumb href="#">Breadcrumb 2</Crumb>
      <Crumb href="#">Breadcrumb 3</Crumb>
      <Crumb href="#">Breadcrumb 4</Crumb>
      <Crumb href="#" isCurrent>
        Current Page
      </Crumb>
    </Breadcrumbs>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const items = canvas.getAllByRole("listitem");
    await expect(items.length).toBe(5);

    const links = canvas.getAllByRole("link");
    await userEvent.tab();
    await expect(links[0]).toHaveFocus();

    await userEvent.tab();
    await expect(links[1]).toHaveFocus();
  },
};
LongTrailBreadcrumbs.parameters = {
  chromatic: { disableSnapshot: true },
};

export const FocusManagement: Story = {
  render: () => (
    <Breadcrumbs>
      <Crumb href="#">Breadcrumb 1</Crumb>
      <Crumb href="#">Breadcrumb 2</Crumb>
      <Crumb href="#">Breadcrumb 3</Crumb>
      <Crumb href="#" isCurrent>
        Current Page
      </Crumb>
    </Breadcrumbs>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const nav = canvas.getByRole("navigation", { name: /breadcrumbs/i });
    await expect(nav).toBeInTheDocument();

    const links = canvas.getAllByRole("link");
    await expect(links).toHaveLength(3);

    await userEvent.tab();
    await expect(links[0]).toHaveFocus();

    await userEvent.tab();
    await expect(links[1]).toHaveFocus();

    await userEvent.tab();
    await expect(links[2]).toHaveFocus();

    await userEvent.tab({ shift: true });
    await expect(links[1]).toHaveFocus();
  },
};
FocusManagement.parameters = {
  chromatic: { disableSnapshot: true },
};
