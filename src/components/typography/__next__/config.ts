import { ArgTypes } from "@storybook/react";
import { VARIANT_TYPES, VALID_HTML_VARIANTS } from "./typography.component";

const VARIANT_TYPES_ARG_TYPES: ArgTypes = {
  variant: {
    options: VARIANT_TYPES,
    control: {
      type: "select",
    },
  },
  as: {
    options: VALID_HTML_VARIANTS,
    control: {
      type: "select",
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
  color: {
    control: "text",
    description: "CSS color value for text",
  },
  fontSize: {
    control: "text",
    description: "CSS font-size value",
  },
  fontWeight: {
    control: "text",
    description: "CSS font-weight value",
  },
  letterSpacing: {
    control: "text",
    description: "CSS letter-spacing value",
  },
  lineHeight: {
    control: "text",
    description: "CSS line-height value",
  },
  textDecoration: {
    control: "text",
    description: "CSS text-decoration value",
  },
  textTransform: {
    control: "text",
    description: "CSS text-transform value",
  },
};

export { VARIANT_TYPES_ARG_TYPES, ALLOWED_CSS_TEXT_OVERRIDES_ARG_TYPES };
