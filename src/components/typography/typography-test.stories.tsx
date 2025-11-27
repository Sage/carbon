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
    options: ["M", "L"],
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

// Story to display all variants of the typography component (supported & deprecated) to allow visual and DOM comparison
export const AllVariants = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Typography variant="h1-large">h1-large (Deprecated)</Typography>
    <Typography variant="h1">h1</Typography>
    <Typography variant="h2">h2</Typography>
    <Typography variant="h3">h3</Typography>
    <Typography variant="h4">h4</Typography>
    <Typography variant="h5">h5</Typography>
    <Typography variant="segment-header">
      segment-header (Deprecated)
    </Typography>
    <Typography variant="section-heading">section-heading</Typography>
    <Typography variant="segment-header-small">
      segment-header-small (Deprecated)
    </Typography>
    <Typography variant="segment-subheader">
      segment-subheader (Deprecated)
    </Typography>
    <Typography variant="section-subheading">section-subheading</Typography>
    <Typography variant="segment-subheader-alt">
      segment-subheader-alt (Deprecated)
    </Typography>
    <Typography variant="p">p</Typography>
    <Typography variant="span">span (Deprecated)</Typography>
    <Typography variant="small">small (Deprecated)</Typography>
    <Typography variant="big">big (Deprecated)</Typography>
    <Typography>
      Text with <Typography variant="sup">sup</Typography> content
    </Typography>
    <Typography>
      Text with <Typography variant="sub">sub</Typography> content
    </Typography>
    <Typography variant="strong">strong</Typography>
    <Typography variant="b">b</Typography>
    <Typography variant="em">em (Deprecated)</Typography>
    <Typography variant="ul">
      <li>ul - item 1</li>
      <li>ul - item 2</li>
    </Typography>
    <Typography variant="ol">
      <li>ol - item 1</li>
      <li>ol - item 2</li>
    </Typography>
  </div>
);
AllVariants.storyName = "All Variants (Supported & Deprecated)";
