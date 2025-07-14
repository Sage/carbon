import React from "react";
import { action } from "storybook/actions";
import Pill from "./pill.component";
import Box from "../box";

export default {
  title: "Pill/Test",
  component: Pill,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    onDelete: {
      control: {
        type: "boolean",
      },
    },
  },
};

type PillStoryArgs = {
  children: string;
  onDelete: boolean;
};

export const Default = ({ children, onDelete, ...args }: PillStoryArgs) => {
  return (
    <Pill onDelete={onDelete ? action("delete") : undefined} {...args}>
      {children}
    </Pill>
  );
};
Default.story = {
  name: "default",
  args: {
    children: "Pill",
    borderColor: undefined,
    fill: false,
    onDelete: false,
    size: "M",
    pillRole: "tag",
    colorVariant: "neutral",
  },
};

export const StatusDarkBackground = ({
  children,
  onDelete,
  ...args
}: PillStoryArgs) => {
  return (
    <Box backgroundColor="#262626" p={2} width="100px">
      <Pill
        isDarkBackground
        onDelete={onDelete ? action("delete") : undefined}
        {...args}
      >
        {children}
      </Pill>
    </Box>
  );
};

StatusDarkBackground.story = {
  argTypes: {
    colorVariant: {
      options: [
        "neutral",
        "negative",
        "positive",
        "warning",
        "information",
        "neutralWhite",
      ],
      control: {
        type: "select",
      },
    },
  },
  args: {
    children: "Pill",
    fill: true,
    onDelete: true,
    size: "M",
    pillRole: "status",
    colorVariant: "neutral",
  },
};
