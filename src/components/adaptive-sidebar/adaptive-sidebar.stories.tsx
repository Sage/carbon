import { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import allModes from "../../../.storybook/modes";
import isChromatic from "../../../.storybook/isChromatic";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import AdaptiveSidebar from ".";
import Box from "../box";
import Typography from "../typography";

import Button from "../button/__next__";
import Divider from "../divider";

const lightGreyBackground: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  height: "250px",
  backgroundColor: "rgb(242, 245, 246)",
};

const styledSystemProps = generateStyledSystemProps({
  margin: true,
  padding: true,
});

const defaultOpenState = isChromatic();

const meta: Meta<typeof AdaptiveSidebar> = {
  title: "Adaptive Sidebar",
  component: AdaptiveSidebar,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: {
      modes: {
        desktop: allModes.chromatic,
      },
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
type Story = StoryObj<typeof AdaptiveSidebar>;

export const Default: Story = {
  render: ({ ...args }) => {
    const [isOpen, setIsOpen] = useState(defaultOpenState);
    return (
      <>
        <Box m={2} width="100%" display="flex" flexDirection="column" gap={2}>
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Close" : "Open"} Sidebar
          </Button>
          <Typography>Main content</Typography>
        </Box>
        <AdaptiveSidebar {...args} open={isOpen}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            p={1}
          >
            <Typography variant="h2" inverse={args.variant === "inverse"}>
              Content
            </Typography>
            <Button
              onClick={() => setIsOpen(false)}
              variantType="secondary"
              inverse={args.variant === "inverse"}
            >
              Close
            </Button>
          </Box>
          <Divider
            type="horizontal"
            m={0}
            inverse={args.variant === "inverse"}
          />
          <Typography p={1} inverse={args.variant === "inverse"}>
            AdaptiveSidebar Content
          </Typography>
        </AdaptiveSidebar>
      </>
    );
  },
  args: {
    "aria-label": "Adaptive Sidebar",
  },
};

export const WithCustomWidth: Story = {
  ...Default,
  args: {
    ...Default.args,
    width: "500px",
  },
};

export const WithCustomHeight: Story = {
  ...Default,
  args: {
    ...Default.args,
    height: "150px",
  },
};

export const AltVariant: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: "alt",
  },
  parameters: {
    chromatic: { viewports: [767, 1200] },
  },
};

export const InverseVariant: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: "inverse",
  },
  parameters: {
    chromatic: { viewports: [767, 1200] },
  },
};

export const AdaptiveBreakpoint: Story = {
  ...Default,
  args: {
    ...Default.args,
    adaptiveBreakpoint: 500,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const RenderAsModal: Story = {
  ...Default,
  args: {
    ...Default.args,
    renderAsModal: true,
  },
};

export const Hidden: Story = {
  render: ({ ...args }) => {
    const [isHidden, setIsHidden] = useState(!defaultOpenState);
    return (
      <>
        <Box m={2} width="100%" display="flex" flexDirection="column" gap={2}>
          <Button onClick={() => setIsHidden(!isHidden)}>
            {!isHidden ? "Hide" : "Show"} Sidebar
          </Button>
          <Typography>Main content</Typography>
        </Box>
        <AdaptiveSidebar {...args} hidden={isHidden}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            p={1}
          >
            <Typography variant="h2" inverse={args.variant === "inverse"}>
              Content
            </Typography>
            <Button
              onClick={() => setIsHidden(true)}
              variantType="secondary"
              inverse={args.variant === "inverse"}
            >
              Hide
            </Button>
          </Box>
          <Divider
            type="horizontal"
            m={0}
            inverse={args.variant === "inverse"}
          />
          <Typography p={1} inverse={args.variant === "inverse"}>
            AdaptiveSidebar Content
          </Typography>
        </AdaptiveSidebar>
      </>
    );
  },
  args: {
    "aria-label": "Adaptive Sidebar",
    open: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
