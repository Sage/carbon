import { CSSProperties } from "react";
import { ArgTypes } from "@storybook/react";

const VARIANT_TYPES = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "section-header",
  "section-subheader",
  "p",
] as const;

const VALID_HTML_VARIANTS = ["h1", "h2", "h3", "h4", "h5", "p"] as const;

type VariantTypes = (typeof VARIANT_TYPES)[number];
type ValidHtmlVariant = (typeof VALID_HTML_VARIANTS)[number];

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

const ALLOWED_CSS_TEXT_OVERRIDE_KEYS = [
  "textTransform",
  "textDecoration",
  "display",
  "whiteSpace",
  "wordBreak",
  "wordWrap",
  "textAlign",
  "textOverflow",
  "overflow",
] as const satisfies (keyof CSSProperties)[];

type AllowedCSSTextOverrides = Pick<
  CSSProperties,
  (typeof ALLOWED_CSS_TEXT_OVERRIDE_KEYS)[number]
>;

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

export {
  VARIANT_TYPES,
  VARIANT_TYPES_ARG_TYPES,
  ALLOWED_CSS_TEXT_OVERRIDE_KEYS,
  ALLOWED_CSS_TEXT_OVERRIDES_ARG_TYPES,
};
export type { VariantTypes, ValidHtmlVariant, AllowedCSSTextOverrides };
