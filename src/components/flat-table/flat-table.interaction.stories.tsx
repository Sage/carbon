import React from "react";
import { StoryObj, composeStory } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import { FlatTable } from "./flat-table.component";
import meta, { DefaultStory, Paginated } from "./flat-table.stories";

type Story = StoryObj<typeof FlatTable>;

export default {
  title: "Flat Table/Interactions",
  component: FlatTable,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const FlatTableFocused: Story = {
  ...DefaultStory,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const focusableTableContainer = canvas.getByTestId("flat-table-container");

    await userEvent.tab();

    await expect(focusableTableContainer).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

const composedPaginationStory = composeStory(Paginated, meta);

export const FlatTableWithPagerFocused: Story = {
  render: composedPaginationStory,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const focusableTableContainer = canvas.getByTestId("flat-table-container");

    await userEvent.tab();

    await expect(focusableTableContainer).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
