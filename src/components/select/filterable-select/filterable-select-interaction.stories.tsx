import React from "react";

import { StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import { FilterableSelect, FilterableSelectProps, Option } from "..";
import Box from "../../box";
import Button from "../../button";

import { allowInteractions } from "../../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof FilterableSelect>;

export default {
  title: "Select/Filterable/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

/* Also demonstrates that falsy children are filtered out correctly */
const ControlledFilterableSelect = (
  props: Omit<FilterableSelectProps, "children" | "onChange" | "value">,
) => {
  const [value, setValue] = React.useState<string>("");
  return (
    <FilterableSelect
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {undefined}
      {null}
      {false}
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
      <Option text="Orange" value="6" />
      <Option text="Pink" value="7" />
      <Option text="Purple" value="8" />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </FilterableSelect>
  );
};

export const OpenFromIconClick: Story = {
  render: () => (
    <Box height={220}>
      <ControlledFilterableSelect name="simple" id="simple" label="color" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const filterableSelectIcon = canvas.getByTestId("icon");
    await userEvent.click(filterableSelectIcon);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
OpenFromIconClick.storyName = "Open From Icon";

export const HighlightItem: Story = {
  render: () => (
    <Box height={220}>
      <ControlledFilterableSelect name="simple" id="simple" label="color" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox");

    await userEvent.click(input);

    await userEvent.keyboard("{ArrowDown}");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
HighlightItem.storyName = "Highlight Item";

export const PartialFilterItem: Story = {
  render: () => (
    <Box height={220}>
      <ControlledFilterableSelect name="simple" id="simple" label="color" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox");

    await userEvent.click(input);

    await userEvent.keyboard("am");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
PartialFilterItem.storyName = "Partial Filter Item";

export const HoverItem: Story = {
  render: () => (
    <Box height={220}>
      <ControlledFilterableSelect name="simple" id="simple" label="color" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox");
    await userEvent.click(input);

    const amber = canvas.getByText("Amber");

    await userEvent.hover(amber);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
  parameters: {
    pseudo: {
      hover: '[role="option"]',
    },
  },
};
HoverItem.storyName = "Hover Item";

export const HoverHighlightedItem: Story = {
  render: () => (
    <Box height={220}>
      <ControlledFilterableSelect name="simple" id="simple" label="color" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox");

    await userEvent.click(input);

    await userEvent.keyboard("{ArrowDown}");

    const amber = canvas.getByText("Amber");
    await userEvent.hover(amber);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
  parameters: {
    pseudo: {
      hover: '[role="option"]',
    },
  },
};
HoverHighlightedItem.storyName = "Hover Highlighted Item";

export const NoResults: Story = {
  render: () => (
    <Box height={220}>
      <ControlledFilterableSelect name="simple" id="simple" label="color" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox");

    await userEvent.click(input);

    await userEvent.keyboard("xyz");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
NoResults.storyName = "No Results";

export const WithActionButton: Story = {
  render: () => (
    <Box height={220}>
      <ControlledFilterableSelect
        name="simple"
        id="simple"
        label="color"
        listActionButton={
          <Button iconType="add" iconPosition="after">
            Action Button
          </Button>
        }
        onListAction={() => {}}
      />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox");

    await userEvent.click(input);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
WithActionButton.storyName = "With Action Button";
