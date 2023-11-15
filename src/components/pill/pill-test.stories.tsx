import React from "react";
import { action } from "@storybook/addon-actions";
import Pill, { PillProps } from "./pill.component";
import Box from "../box";

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
      options: ["neutral", "negative", "positive", "warning", "information"],
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

export const PillComponent = ({
  children = "noop",
  ...args
}: Partial<PillProps>) => {
  return <Pill {...args}>{children}</Pill>;
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
