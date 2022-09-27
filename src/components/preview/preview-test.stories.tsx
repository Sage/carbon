import React from "react";
import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import Preview from "./preview.component";

export default {
  title: "Preview/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    childrenSpecialCharacters: specialCharacters,
  },
};

export const Default = ({
  children,
  childrenSpecialCharacters,
  ...args
}: {
  children?: string;
  childrenSpecialCharacters?: string;
}) => <Preview {...args}>{children || childrenSpecialCharacters}</Preview>;

Default.story = {
  name: "default",
  args: {
    children: "Text rendered as children component.",
    childrenSpecialCharacters: undefined,
    height: "",
    lines: 1,
    loading: true,
    width: "",
  },
};
