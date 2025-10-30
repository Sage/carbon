import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import Drawer from ".";
import Button from "../button";
import Typography from "../typography";
import Box from "../box";

const meta: Meta<typeof Drawer> = {
  title: "Drawer",
  component: Drawer,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    controls: {
      exclude: ["title", "footer", "sidebar", "onChange", "children"],
    },
  },
  decorators: [
    (Story) => (
      <Box backgroundColor="--colorsUtilityMajor025" p={2} height="300px">
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: (args) => (
    <Drawer {...args}>
      <Box p={3}>Main body content</Box>
    </Drawer>
  ),
  args: {
    sidebar: <Box p={3}>Drawer content</Box>,
  },
};

export const Height: Story = {
  ...Default,
  args: {
    ...Default.args,
    height: "100px",
  },
};

export const SidebarWidth: Story = {
  ...Default,
  args: {
    ...Default.args,
    expandedWidth: "400px",
  },
};

export const WithTitle: Story = {
  ...Default,
  args: {
    ...Default.args,
    title: <Typography variant="h2">Drawer Title</Typography>,
  },
};

export const WithFooter: Story = {
  ...WithTitle,
  args: {
    ...WithTitle.args,
    footer: (
      <Box display="flex" justifyContent="flex-end">
        <Button buttonType="primary">Footer Action</Button>
      </Box>
    ),
  },
};

export const StickyHeaderAndFooter: Story = {
  ...WithFooter,
  args: {
    ...WithFooter.args,
    stickyHeader: true,
    stickyFooter: true,
    height: "300px",
    sidebar: (
      <Box p={3}>
        <Typography>Drawer Content</Typography>
        <Typography>Drawer Content</Typography>
        <Typography>Drawer Content</Typography>
        <Typography>Drawer Content</Typography>
        <Typography>Drawer Content</Typography>
      </Box>
    ),
  },
};

export const SidebarAriaLabel: Story = {
  ...Default,
  args: {
    ...Default.args,
    sidebarAriaLabel: "This is a Drawer",
  },
};

export const WithBackgroundColor: Story = {
  ...Default,
  args: {
    ...Default.args,
    backgroundColor: "var(--colorsUtilityMajor050)",
  },
};

export const Controlled = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <Drawer
        expanded={isExpanded}
        height="225px"
        sidebar={<Box p={3}>Drawer content</Box>}
      >
        <Box p={3}>Main body content</Box>
      </Drawer>

      <Button
        mt={2}
        buttonType="primary"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Show/Hide Drawer
      </Button>
    </>
  );
};
Controlled.storyName = "Controlled";
