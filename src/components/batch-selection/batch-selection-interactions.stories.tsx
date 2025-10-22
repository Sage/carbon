import React from "react";
import { StoryFn, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import BatchSelection from ".";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";
import IconButton from "../icon-button";
import Icon from "../icon";
import Button from "../button";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof BatchSelection>;

export default {
  title: "Batch Selection/Interactions",
  component: BatchSelection,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [(StoryToRender: StoryFn) => <StoryToRender />],
};

export const ClickBatchSelection: Story = {
  render: () => (
    <BatchSelection selectedCount={0}>
      <Button size="small" mx={1} buttonType="secondary">
        Select All 38 items
      </Button>
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
    </BatchSelection>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    await userInteractionPause(500);

    const canvas = within(canvasElement);
    const itemButton = canvas.getAllByRole("button");

    await userInteractionPause(500);
    await userEvent.click(itemButton[0]);
    await userEvent.click(itemButton[1]);
    await userEvent.click(itemButton[2]);
    await userEvent.click(itemButton[3]);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

ClickBatchSelection.storyName = "onClick";
ClickBatchSelection.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const hoverBatchSelection: Story = {
  render: () => (
    <BatchSelection selectedCount={0}>
      <Button size="small" mx={1} buttonType="secondary">
        Select All 38 items
      </Button>
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
    </BatchSelection>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const ibutton = canvas.getAllByRole("button");

    await userInteractionPause(1000);
    await userEvent.tab();
    await userEvent.hover(ibutton[0]);
    await userEvent.tab();
    await userEvent.hover(ibutton[1]);
    await userEvent.tab();
    await userEvent.hover(ibutton[2]);
    await userEvent.tab();
    await userEvent.hover(ibutton[3]);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
hoverBatchSelection.storyName = "Hover";
hoverBatchSelection.parameters = {
  pseudo: {
    hover: '[data-component="icon-button"]',
  },
};
