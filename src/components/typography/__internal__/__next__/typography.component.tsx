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
  "ul",
  "ol",
  "sup",
  "sub",
  "strong",
  "b",
  "p",
] as const;

type VariantTypes = (typeof VARIANT_TYPES)[number];

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

export type AllowedCSSTextOverrides = Pick<
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
  as?: React.ElementType;
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
  /** The size to apply to text. Only available for non-heading variants. */
  size?: "M" | "L";
  /** The color tint to apply to text. Accepts "default" for standard text color or "alt" for alternative text color. Only available for non-heading variants. */
  tint?: "default" | "alt";
  /** The font weight to apply to text. Only available for non-heading variants. Note: Has no effect on "strong" or "b" variants as they have fixed medium weight. */
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
  size = "M",
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

  function calculateStyledVariant() {
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
      variant={calculateStyledVariant()}
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
