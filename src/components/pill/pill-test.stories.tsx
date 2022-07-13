import React from "react";
import { action } from "@storybook/addon-actions";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import Pill from "./pill.component";

export default {
  title: "Pill/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
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
    childrenSpecialCharacters: specialCharacters,
  },
};

type PillStoryArgs = {
  children: string;
  childrenSpecialCharacters: string;
  onDelete: boolean;
};

export const Default = ({
  children,
  childrenSpecialCharacters,
  onDelete,
  ...args
}: PillStoryArgs) => {
  return (
    <Pill onDelete={onDelete ? action("delete") : undefined} {...args}>
      {children || childrenSpecialCharacters}
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
    childrenSpecialCharacters: undefined,
    borderColor: undefined,
    fill: false,
    onDelete: false,
    size: "M",
    pillRole: "tag",
    colorVariant: "neutral",
  },
};
