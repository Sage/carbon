import React from "react";
import { userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";

import BatchSelection, { BatchSelectionProps } from ".";
import IconButton from "../icon-button";
import Icon from "../icon";

export default {
  title: "Batch Selection/Test",
  excludeStories: ["meta"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    colorTheme: {
      options: ["dark", "light", "white", "transparent"],
      control: {
        type: "select",
      },
    },
  },
};

export const Default = (args: Omit<BatchSelectionProps, "children">) => (
  <BatchSelection {...args}>
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
);

Default.storyName = "default";
Default.args = {
  disabled: false,
  hidden: false,
  selectedCount: 0,
  colorTheme: "transparent",
};

export const BatchSelectionComponent = ({
  children,
  selectedCount = 0,
  ...rest
}: Partial<BatchSelectionProps>) => (
  <BatchSelection {...rest} selectedCount={selectedCount}>
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="csv" />
    </IconButton>
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="bin" />
    </IconButton>
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="pdf" />
    </IconButton>
    {children}
  </BatchSelection>
);

// Play Functions
const meta: Meta<typeof BatchSelection> = {
  title: "BatchSelection",
  component: BatchSelection,
  parameters: { chromatic: { disableSnapshot: true } },
};

export { meta };

type Story = StoryObj<typeof BatchSelection>;

export const DefaultBatchSelectionComponent = () => {
  return (
    <BatchSelection selectedCount={1}>
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
  );
};

export const HoverBatchSelectionComponent = () => {
  return (
    <BatchSelection selectedCount={1}>
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
    </BatchSelection>
  );
};

export const BatchSelectionIconClick: Story = {
  render: () => <DefaultBatchSelectionComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ButtonComponent = canvas.getByRole("button", { name: "csv" });

    await userEvent.click(ButtonComponent);
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};

BatchSelectionIconClick.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const BatchSelectionIconHover: Story = {
  render: () => <HoverBatchSelectionComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const csvButtonComponent = canvas.getByRole("button", { name: "csv" });

    await userEvent.hover(csvButtonComponent);
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};

BatchSelectionIconHover.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
  pseudo: { hover: true },
};
