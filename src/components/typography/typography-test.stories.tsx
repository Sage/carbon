import React from "react";
import { ArgTypes } from "@storybook/react";
import Typography, { TypographyProps } from ".";
import { VARIANT_TYPES } from "./typography.component";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const VARIANT_TYPES_ARG_TYPES: ArgTypes = {
  variant: {
    options: VARIANT_TYPES,
    control: {
      type: "select",
    },
  },
  as: {
    control: {
      type: "object",
    },
  },
  fluid: {
    control: "boolean",
  },
  inverse: {
    control: "boolean",
  },
  screenReaderOnly: {
    control: "boolean",
  },
  size: {
    options: ["regular", "large"],
    control: {
      type: "select",
    },
  },
  tint: {
    options: ["default", "alt"],
    control: {
      type: "select",
    },
  },
  weight: {
    options: ["regular", "medium"],
    control: {
      type: "select",
    },
  },
};

const ALLOWED_CSS_TEXT_OVERRIDES_ARG_TYPES: ArgTypes = {
  textTransform: {
    control: "text",
    description: "CSS text-transform value",
  },
  textDecoration: {
    control: "text",
    description: "CSS text-decoration value",
  },
  display: {
    control: "text",
    description: "CSS display value",
  },
  whiteSpace: {
    control: "text",
    description: "CSS white-space value",
  },
  wordBreak: {
    control: "text",
    description: "CSS word-break value",
  },
  wordWrap: {
    control: "text",
    description: "CSS word-wrap value",
  },
  textAlign: {
    control: "text",
    description: "CSS text-align value",
  },
  textOverflow: {
    control: "text",
    description: "CSS text-overflow value",
  },
  overflow: {
    control: "text",
    description: "CSS overflow value",
  },
};

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
