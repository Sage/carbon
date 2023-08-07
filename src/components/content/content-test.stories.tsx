import React from "react";
import Content from ".";

export default {
  title: "Content/Test",
  includeStories: ["DefaultStory"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    variant: {
      options: ["primary", "secondary"],
      control: {
        type: "select",
      },
    },
    align: {
      options: ["left", "center", "right"],
      control: {
        type: "select",
      },
    },
  },
};

interface ContentStoryProps {
  children?: string;
  title?: string;
}

export const DefaultStory = ({
  children,
  title,
  ...args
}: ContentStoryProps) => {
  return (
    <Content title={title} {...args}>
      {children}
    </Content>
  );
};

DefaultStory.storyName = "default";
DefaultStory.args = {
  children: "An example of some content.",
  title: "Content Component",
  variant: undefined,
  inline: false,
  align: undefined,
  titleWidth: "",
  bodyFullWidth: false,
};

export const ContentComponentTest = ({
  // eslint-disable-next-line react/prop-types
  children = "This is an example of some content",
  ...props
}) => {
  return (
    <Content title="Title" {...props}>
      {children}
    </Content>
  );
};
