import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import carbonLogo from "../../../logo/carbon-logo.png";
import LinkPreview from ".";
import Box from "../box";

const meta: Meta<typeof LinkPreview> = {
  title: "Link Preview",
  component: LinkPreview,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
export default meta;
type Story = StoryObj<typeof LinkPreview>;

export const Default: Story = {
  render: (args) => <LinkPreview {...args} />,
  args: {
    title: "Title",
    url: "https://carbon.sage.com",
    description: "Description",
    image: { url: carbonLogo, alt: "Carbon logo" },
  },
};

export const LoadingState: Story = {
  ...Default,
  args: {
    ...Default.args,
    isLoading: true,
  },
};

export const WithCloseButton: Story = {
  render: (args) => (
    <LinkPreview
      onClose={(url) => action("close button clicked")(url)}
      {...args}
    />
  ),
  args: {
    ...Default.args,
    as: "div",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <LinkPreview size="small" {...args} />
      <LinkPreview size="medium" {...args} />
      <LinkPreview size="large" {...args} />
    </>
  ),
  args: {
    ...Default.args,
  },
  decorators: [
    (Story) => (
      <Box display="flex" justifyContent="space-between" gap={2}>
        <Story />
      </Box>
    ),
  ],
};
