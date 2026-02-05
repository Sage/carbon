import React from "react";
import Typography, { TypographyProps } from ".";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import {
  VARIANT_TYPES_ARG_TYPES,
  ALLOWED_CSS_TEXT_OVERRIDES_ARG_TYPES,
} from "./config";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

export default {
  title: "Typography/Test",
  component: Typography,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    ...VARIANT_TYPES_ARG_TYPES,
    ...ALLOWED_CSS_TEXT_OVERRIDES_ARG_TYPES,
    ...styledSystemProps,
  },
};

export const Default = ({ children, ...args }: TypographyProps) => {
  return <Typography {...args}>{children}</Typography>;
};
Default.storyName = "default";
Default.args = {
  children: "Typography",
};
