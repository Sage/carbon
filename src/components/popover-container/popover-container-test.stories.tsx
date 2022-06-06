/* eslint-disable react/prop-types */
import React from "react";

import specialCharacters from "../../../.storybook/utils/argTypes/specialCharacters";
import PopoverContainer from "./popover-container.component";

export default {
  title: "Popover Container/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    titleSpecialCharacters: specialCharacters,
  },
};

export const Default = ({
  title,
  titleSpecialCharacters,
  open,
}: {
  title?: string;
  titleSpecialCharacters?: string;
  open: boolean;
}) => <PopoverContainer title={title || titleSpecialCharacters} open={open} />;

Default.story = {
  name: "default",
  args: {
    title: "Title",
    titleSpecialCharacters: undefined,
    open: true,
  },
};
