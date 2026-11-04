import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import Drawer from ".";
import Typography from "../typography";
import Box from "../box";
import Button from "../button";

const lightGreyBackground: React.CSSProperties = {
  padding: "var(--global-space-layout-2-xs)",
  backgroundColor: "rgb(242, 245, 246)",
};

const meta: Meta<typeof Drawer> = {
  title: "Drawer/Test",
  component: Drawer,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    controls: {
      exclude: ["title", "footer", "sidebar", "onChange", "children"],
    },
  },
  decorators: [
    (Story) => (
      <div style={lightGreyBackground}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const WithShowControls: Story = {
  render: (args) => (
    <Drawer {...args}>
      <Box p={3}>Main body</Box>
    </Drawer>
  ),
  args: {
    sidebar: <Box p={3}>Drawer content</Box>,
    title: <Typography variant="h2">Drawer Title</Typography>,
    footer: (
      <Box display="flex" justifyContent="flex-end">
        <Button buttonType="primary">Footer Action</Button>
      </Box>
    ),
    showControls: true,
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};
