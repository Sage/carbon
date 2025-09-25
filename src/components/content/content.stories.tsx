import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Content from ".";
import Typography from "../typography";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Content> = {
  title: "Deprecated/Content",
  component: Content,
  render: (args) => (
    <Content title="Title" {...args}>
      This is an example of some content
    </Content>
  ),
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    controls: { disabled: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Content>;

export const DefaultStory: Story = {
  name: "Default",
};

export const InlineContent: Story = {
  name: "Inline Content",
  args: {
    inline: true,
    children: "This is an example of some content",
  },
};

export const CustomTitle: Story = {
  name: "Custom Title",
  args: {
    title: <Typography color="primary">Title</Typography>,
    variant: "primary",
    children: "This is an example of some content",
  },
};

export const SecondaryStyling: Story = {
  name: "Secondary Styling",
  args: {
    variant: "secondary",
    children: "This is an example of some content",
  },
};
