import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import BatchSelection from ".";
import Icon from "../icon";
import Button from "../button/__next__";
import Divider from "../divider";
import Box from "../box";
import useMediaQuery from "../../hooks/useMediaQuery";

const meta: Meta<typeof BatchSelection> = {
  title: "Batch Selection",
  component: BatchSelection,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof BatchSelection>;

export const Default: Story = {
  render: (args) => (
    <BatchSelection {...args}>
      <Button variantType="tertiary">Button 1</Button>
      <Button variantType="tertiary">Button 2</Button>
      <Button variantType="tertiary">Button 3</Button>
    </BatchSelection>
  ),
  args: {
    selectedCount: 1,
    totalItems: 10,
    onDismiss: () => {},
  },
};

export const SmallScreen: Story = {
  render: (args) => (
    <BatchSelection {...args}>
      <Button variantType="tertiary">Button 1</Button>
      <Button variantType="tertiary">Button 2</Button>
    </BatchSelection>
  ),
  args: {
    smallScreen: true,
    selectedCount: 1,
    totalItems: 10,
    onDismiss: () => {},
  },
  decorators: [
    (Story) => (
      <Box width="288px">
        <Story />
      </Box>
    ),
  ],
  globals: {
    viewport: { value: "mobile" },
  },
};

export const ExampleImplementation: Story = {
  render: (args) => {
    const isSmallScreen = useMediaQuery("(max-width: 680px)");
    const isLargeScreen = useMediaQuery("(min-width: 840px)");

    const smallScreenActions = (
      <Button variantType="subtle">
        Actions
        <Icon type="caret_down" />
      </Button>
    );

    const mediumScreenActions = (
      <>
        <Button variantType="tertiary">
          <Icon type="placeholder" />
          Action 1
        </Button>
        <Button variantType="tertiary">
          <Icon type="ellipsis_horizontal" />
          More
        </Button>
      </>
    );

    const largeScreenActions = (
      <>
        <Button variantType="tertiary">
          <Icon type="placeholder" />
          Action 1
        </Button>
        <Button variantType="tertiary">
          <Icon type="placeholder" />
          Action 2
        </Button>
        <Button variantType="tertiary">
          <Icon type="placeholder" />
          Action 3
        </Button>
      </>
    );

    return (
      <BatchSelection smallScreen={isSmallScreen} {...args}>
        <Button variantType="subtle">
          <Icon type="check_none" />
          Select All
        </Button>
        {!isSmallScreen && <Divider p={0} height="40px" />}
        {isSmallScreen && smallScreenActions}
        {isLargeScreen && largeScreenActions}
        {!isSmallScreen && !isLargeScreen && mediumScreenActions}
      </BatchSelection>
    );
  },
  args: {
    selectedCount: 1,
    totalItems: 10,
    onDismiss: () => {},
  },
};
