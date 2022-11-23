import React from "react";
import { ComponentStory } from "@storybook/react";

import Content from ".";
import Typography from "../typography";

export const DefaultStory: ComponentStory<typeof Content> = (args) => (
  <Content title="Title" {...args}>
    This is an example of some content
  </Content>
);

export const InlineContent = DefaultStory.bind({});
InlineContent.args = { inline: true };

export const CustomTitle = DefaultStory.bind({});
CustomTitle.args = {
  title: <Typography color="primary">Title</Typography>,
  variant: "primary",
};

export const SecondaryStyling = DefaultStory.bind({});
SecondaryStyling.args = { variant: "secondary" };
