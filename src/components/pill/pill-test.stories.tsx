import React from "react";
import { action } from "@storybook/addon-actions";
import Pill from "./pill.component";

export default {
  title: "Pill/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    pillRole: {
      options: ["tag", "status"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["S", "M", "L", "XL"],
      control: {
        type: "select",
      },
    },
    colorVariant: {
      options: ["neutral", "negative", "positive", "warning"],
      control: {
        type: "select",
      },
    },
    borderColor: {
      control: {
        type: "text",
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
    ml: 0,
    mr: 0,
    mt: 0,
    mb: 0,
    children: "Pill",
    borderColor: undefined,
    fill: false,
    onDelete: false,
    size: "M",
    pillRole: "tag",
    colorVariant: "neutral",
  },
};
