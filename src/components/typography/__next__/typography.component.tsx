import React from "react";
import { SpaceProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import {
  filterStyledSystemMarginProps,
  filterStyledSystemPaddingProps,
} from "../../../style/utils";
import StyledTypography from "./typography.style";
import filterObjectProperties from "../../../__internal__/filter-object-properties";
import {
  VariantTypes,
  ValidHtmlVariant,
  ALLOWED_CSS_TEXT_OVERRIDE_KEYS,
  AllowedCSSTextOverrides,
} from "./config";

export interface TypographyProps
  extends SpaceProps,
    TagProps,
    AllowedCSSTextOverrides {
  /** Adds element and creates a visual style associated with said element. */
  variant?: VariantTypes;
  /** Override the underlying HTML element rendered by the component. */
  as?: ValidHtmlVariant;
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
}

export const Typography = ({
  variant = "p",
  as,
  children,
  id,
  fluid = false,
  inverse,
  screenReaderOnly,
  size = "regular",
  tint = "default",
  weight = "regular",
  ...rest
}: TypographyProps) => {
  function calculateAs() {
    if (as) {
      return as;
    }
    if (variant === "section-header") {
      return "h2";
    }
    if (variant === "section-subheader") {
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
