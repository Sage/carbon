import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from ".";
import Box from "../box/box.component";
import Typography from "../typography";
import Image from "../image";
import collaborateSvg from "../../../.assets/collaborate.svg";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof Accordion> = {
  title: "Accordion",
  component: Accordion,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
    </Accordion>
  ),
  args: {
    title: "Title",
  },
};

export const Subtitle: Story = {
  ...Default,
  args: {
    ...Default.args,
    subTitle: "Subtitle",
  },
};

export const WithCustomTitle: Story = ({ ...args }) => {
  const title = (
    <Box display="flex" alignItems="center" gap="16px">
      <Image size="60px" src={collaborateSvg} decorative />
      <Box>
        <Typography variant="h2" fontSize="21px">
          Custom Title
        </Typography>
        <Typography
          as="span"
          fontSize="16px"
          color="rgba(0,0,0,0.65)"
          fontWeight="500"
        >
          Custom Subtitle
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Accordion title={title} {...args}>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
    </Accordion>
  );
};
WithCustomTitle.storyName = "Custom Title";

export const SimpleVariant: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Box>Content</Box>
      <Box>Content</Box>
      <Box mb={1}>Content</Box>
    </Accordion>
  ),
  args: {
    ...Default.args,
    title: "Accordion label",
    variant: "simple",
  },
};

export const StandardSizes: Story = ({ ...args }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Accordion title="Small Standard" size="small" {...args}>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
      </Accordion>

      <Accordion title="Medium Standard" size="medium" {...args}>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
      </Accordion>
    </Box>
  );
};
StandardSizes.storyName = "Standard Sizes";
StandardSizes.args = {
  subTitle: "Subtitle",
};

export const SimpleSizes: Story = ({ ...args }) => {
  return (
    <Box display="flex" alignItems="flex-start">
      <Accordion title="Small Simple" size="small" {...args}>
        <Box>Content</Box>
        <Box>Content</Box>
        <Box mb={1}>Content</Box>
      </Accordion>

      <Accordion title="Medium Simple" size="medium" {...args}>
        <Box>Content</Box>
        <Box>Content</Box>
        <Box mb={1}>Content</Box>
      </Accordion>

      <Accordion title="Large Simple" size="large" {...args}>
        <Box>Content</Box>
        <Box>Content</Box>
        <Box mb={1}>Content</Box>
      </Accordion>
    </Box>
  );
};
SimpleSizes.storyName = "Simple Sizes";
SimpleSizes.args = {
  variant: "simple",
};

export const HeaderSpacing: Story = {
  ...Default,
  args: {
    ...Default.args,
    headerSpacing: {
      padding: "24px 0",
    },
  },
};

export const DisableBorders: Story = {
  ...Default,
  args: {
    ...Default.args,
    borders: "none",
  },
};

export const Width: Story = {
  ...Default,
  args: {
    ...Default.args,
    width: "500px",
  },
};
