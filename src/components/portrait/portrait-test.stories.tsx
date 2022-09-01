import React from "react";
import { action } from "@storybook/addon-actions";
import { ComponentMeta } from "@storybook/react";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import { ICONS } from "../icon/icon-config";
import { PORTRAIT_SHAPES, PORTRAIT_SIZES } from "./portrait.config";
import Portrait, { PortraitProps } from "./portrait.component";

export default {
  title: "Portrait/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    iconType: {
      options: ICONS,
      control: {
        type: "select",
      },
    },
    size: {
      options: PORTRAIT_SIZES,
      control: {
        type: "select",
      },
    },
    shape: {
      options: PORTRAIT_SHAPES,
      control: {
        type: "select",
      },
    },
    altSpecialCharacters: specialCharacters,
  },
} as ComponentMeta<typeof Portrait>;

export const Default = ({
  alt,
  altSpecialCharacters,
  ...args
}: {
  alt?: string;
  altSpecialCharacters?: string;
} & PortraitProps) => (
  <Portrait
    onClick={action("click")}
    alt={alt || altSpecialCharacters}
    {...args}
  />
);

Default.storyName = "default";
Default.args = {
  alt: "",
  altSpecialCharacters: undefined,
  darkBackground: false,
  gravatar: "",
  src: "",
  initials: "",
  iconType: undefined,
  size: "M",
  shape: "square",
};
