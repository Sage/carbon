import React, { HTMLAttributes, AriaAttributes, CSSProperties } from "react";
import { SpaceProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../../__internal__/utils/helpers/tags";
import {
  filterStyledSystemMarginProps,
  filterStyledSystemPaddingProps,
} from "../../../../style/utils";
import StyledTypography from "./typography.style";
import filterObjectProperties from "../../../../__internal__/filter-object-properties";

export const VARIANT_TYPES = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "section-heading",
  "section-subheading",
  "p",
] as const;

export const VALID_HTML_VARIANTS = ["h1", "h2", "h3", "h4", "h5", "p"] as const;

type VariantTypes = (typeof VARIANT_TYPES)[number];
export type ValidHtmlVariant = (typeof VALID_HTML_VARIANTS)[number];
/* TODO: remove the legacy valid html variants when the deprecated `Typography` is removed and the new next `Typography` component becomes the default. 
These variants are currently still accepted for backward compatibility but will be removed in the future. */
export type LegacyValidHtmlVariant =
  | "ul"
  | "ol"
  | "span"
  | "small"
  | "sup"
  | "sub"
  | "strong"
  | "b"
  | "em";

export const ALLOWED_CSS_TEXT_OVERRIDE_KEYS = [
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

export interface TypographyProps
  extends SpaceProps,
    TagProps,
    Pick<HTMLAttributes<HTMLElement>, "role">,
    Pick<AriaAttributes, "aria-hidden" | "aria-live">,
    AllowedCSSTextOverrides {
  /** Adds element and creates a visual style associated with said element. */
  variant?: VariantTypes;
  /** Override the underlying HTML element rendered by the component. */
  as?: ValidHtmlVariant | LegacyValidHtmlVariant;
  /** Content to be rendered inside the Typography component. */
  children?: React.ReactNode;
  /** Set the ID attribute of the Typography component. */
  id?: string;
  /** When set to `true`, uses fluid typography with CSS clamp() values for responsive sizing. */
  fluid?: boolean;
  /** When set to `true`, inverts the font color for use on darker backgrounds. */
  inverse?: boolean;
  /** When set to `true`, the component will apply visually hidden styling, hiding the component visually but ensuring the component is still in the accessibility tree. */
  screenReaderOnly?: boolean;
  /** The size to apply to paragraph text. Only available when variant is "p". */
  size?: "regular" | "large";
  /** The color tint to apply to paragraph text. Accepts "default" for standard text color or "alt" for alternative text color. Only available when variant is "p". */
  tint?: "default" | "alt";
  /** The font weight to apply to paragraph text. Only available when variant is "p". */
  weight?: "regular" | "medium";
  /**
   * @private
   * @internal
   * @ignore
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
}

export const Typography = ({
  variant = "p",
  as,
  children,
  id,
  fluid = false,
  inverse = false,
  screenReaderOnly = false,
  size = "regular",
  tint = "default",
  weight = "regular",
  role,
  "aria-hidden": ariaHidden,
  "aria-live": ariaLive,
  className,
  ...rest
}: TypographyProps) => {
  function calculateAs() {
    if (as) {
      return as;
    }
    if (variant === "section-heading") {
      return "h2";
    }
    if (variant === "section-subheading") {
      return "h3";
    }
    return variant;
  }

  return (
    <StyledTypography
      id={id}
      as={calculateAs()}
      variant={variant}
      fluid={fluid}
      inverse={inverse}
      screenReaderOnly={screenReaderOnly}
      size={size}
      tint={tint}
      weight={weight}
      role={role}
      aria-hidden={ariaHidden}
      aria-live={ariaLive}
      className={className}
      {...tagComponent("typography", rest)}
      {...filterStyledSystemMarginProps(rest)}
      {...filterStyledSystemPaddingProps(rest)}
      {...filterObjectProperties(rest, ALLOWED_CSS_TEXT_OVERRIDE_KEYS)}
    >
      {children}
    </StyledTypography>
  );
};

export default Typography;
