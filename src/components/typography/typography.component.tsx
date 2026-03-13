import React from "react";
import { SpaceProps } from "styled-system";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import type { TypographyProps as NextTypographyProps } from "./__internal__/__next__/";
import type { AllowedCSSTextOverrides } from "./__internal__/__next__/typography.component";
import filterObjectProperties from "../../__internal__/filter-object-properties";
import { ALLOWED_CSS_TEXT_OVERRIDE_KEYS } from "./__internal__/__next__/typography.component";
import StyledTypography from "./typography.style";

export const VARIANT_TYPES = [
  "h1-large",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "segment-header",
  "section-heading",
  "segment-header-small",
  "segment-subheader",
  "section-subheading",
  "segment-subheader-alt",
  "p",
  "span",
  "small",
  "big",
  "sup",
  "sub",
  "strong",
  "b",
  "em",
  "ul",
  "ol",
] as const;

export type VariantTypes = (typeof VARIANT_TYPES)[number];

export interface TypographyProps
  extends SpaceProps,
    TagProps,
    Pick<
      NextTypographyProps,
      "weight" | "tint" | "size" | "fluid" | "inverse" | "overflow"
    > {
  /** Override the variant component */
  as?: React.ElementType;
  /** Set the ID attribute of the Typography component */
  id?: string;
  /** Content to be rendered inside the Typography component */
  children?: React.ReactNode;
  /**
   * The visual style to apply to the component. Supported variants include:
   * h1, h2, h3, h4, h5, section-heading, section-subheading, p (default),
   * sup, sub, strong, b, ul, ol
   *
   * The following variant values are deprecated with recommended alternatives:
   * - "h1-large" -> use "h1" instead
   * - "segment-header" -> use "section-heading" instead
   * - "segment-header-small" -> use "section-subheading" instead
   * - "segment-subheader" / "segment-subheader-alt" -> use "h5" instead
   * - "span" -> use "p" instead
   * - "small" -> use "p" with the `size` prop set to "M"
   * - "big" -> use "h5" or "h4" depending on context, or "p" with `size` prop set to "L"
   * - "em" -> use "strong" or "b" for semantic emphasis
   */
  variant?: VariantTypes;
  /**
   * @deprecated Use the new `size` prop for paragraphs or choose the appropriate variant for other variants. This prop will eventually be removed.
   * Override the variant font-size */
  fontSize?: string;
  /**
   * @deprecated Use the new `weight` prop for paragraphs or choose the appropriate variant for other variants. This prop will eventually be removed.
   * Override the variant font-weight */
  fontWeight?: string;
  /**
   * @deprecated Choose the appropriate variant for your use case, as each variant has its own line-height. This prop will eventually be removed.
   * Override the variant line-height */
  lineHeight?: string;
  /** Override the variant text-transform */
  textTransform?: string;
  /** Override the variant text-decoration */
  textDecoration?: string;
  /** Override the variant display */
  display?: string;
  /**
   * @deprecated This prop no longer has any effect. This prop will eventually be removed.
   * Override the list-style-type */
  listStyleType?: string;
  /** Override the white-space */
  whiteSpace?: string;
  /** Override the word-break */
  wordBreak?: string;
  /** Override the word-wrap */
  wordWrap?: string;
  /** Override the text-align */
  textAlign?: string;
  /** Override the text-overflow */
  textOverflow?: string;
  /**
   * @deprecated Use `textOverflow` and `whiteSpace` props instead. This prop will eventually be removed.
   * Apply truncation */
  truncate?: boolean;
  /**
   * @deprecated This prop no longer has any effect. This prop will eventually be removed.
   * Override the color style */
  color?: string;
  /**
   * @deprecated This prop no longer has any effect. This prop will eventually be removed.
   * Override the backgroundColor style */
  backgroundColor?: string;
  /**
   * @deprecated This prop no longer has any effect. This prop will eventually be removed.
   * Override the bg value shorthand for backgroundColor */
  bg?: string;
  /**
   * @deprecated This prop no longer has any effect. This prop will eventually be removed.
   * Override the opacity value */
  opacity?: string | number;
  /** Set whether it will be visually hidden
   * NOTE: This is for screen readers only and will make a lot of the other props redundant */
  screenReaderOnly?: boolean;
  /**
   * @deprecated
   * @private
   * @ignore
   * Override the default color of the rendered element to match disabled styling
   * */
  isDisabled?: boolean;
  /** Make the element an aria-live region */
  "aria-live"?: "off" | "assertive" | "polite";
  /** Set the role of the element when it is a live region */
  role?: "status" | "alert";
  /** @private @ignore Set whether the component should be recognised by assistive technologies */
  "aria-hidden"?: "true" | "false";
  /**
   * @private
   * @internal
   * @ignore
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
  /** @private @internal @ignore */
  "data-component"?: string;
}

// Maps deprecated variants to new semantic variants to avoid breaking changes
const getNextVariant = (
  variant?: VariantTypes,
): NextTypographyProps["variant"] => {
  switch (variant) {
    case "h1-large":
      return "h1";
    case "segment-header":
      return "section-heading";
    case "segment-header-small":
      return "section-subheading";
    case "segment-subheader":
    case "segment-subheader-alt":
      return "h5";
    // passes through valid variants that exist in both versions without modification, any variant which doesn't exist in the next version will default to the standard token
    default:
      return variant as NextTypographyProps["variant"];
  }
};

const VARIANT_TO_ELEMENT: Record<VariantTypes, React.ElementType> = {
  "h1-large": "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  "segment-header": "h5",
  "segment-header-small": "h5",
  "segment-subheader": "h5",
  "segment-subheader-alt": "h5",
  "section-heading": "h2",
  "section-subheading": "h3",
  p: "p",
  span: "p",
  small: "p",
  big: "p",
  sup: "sup",
  sub: "sub",
  strong: "strong",
  em: "strong",
  b: "b",
  ul: "ul",
  ol: "ol",
};

const getAs = (variant?: VariantTypes): React.ElementType =>
  (variant && VARIANT_TO_ELEMENT[variant]) ?? "p";

/**
 * @deprecated This component is deprecated and will be removed in a future release.
 * Please use the Typography component from `carbon-react/__next__` instead, which provides improved
 * semantic variants (h1, h2, h3, h4, h5, section-heading, section-subheading, and p) and better
 * design token alignment.
 */
export const Typography = ({
  variant = "p",
  as,
  id,
  fluid = false,
  inverse = false,
  size = "M",
  tint = "default",
  weight = "regular",
  truncate = false,
  children,
  screenReaderOnly = false,
  "aria-live": ariaLive,
  "aria-hidden": ariaHidden,
  ...rest
}: TypographyProps) => {
  const nextVariant = getNextVariant(variant);

  // Extracts all allowed CSS text overrides, casts types which were string | undefined to match the expected types in the next version to avoid a breaking change
  const cssProps = filterObjectProperties(
    rest,
    ALLOWED_CSS_TEXT_OVERRIDE_KEYS,
  ) as AllowedCSSTextOverrides;

  // Apply truncate behavior if truncate prop is true, keeps the truncate prop for backwards compatibility but encourages use of textOverflow and whiteSpace props instead
  if (truncate) {
    cssProps.overflow = "hidden";
    cssProps.whiteSpace = "nowrap";
    cssProps.textOverflow = "ellipsis";
  }

  // Renders styled component override of the next version of the component, overrides `lineHeight`, `fontSize` and `fontWeight` as these are used heavily in consuming products
  return (
    <StyledTypography
      variant={nextVariant}
      forwardedAs={as || getAs(variant)}
      id={id}
      {...cssProps}
      fluid={fluid}
      inverse={inverse}
      screenReaderOnly={screenReaderOnly}
      aria-live={ariaLive}
      aria-hidden={ariaHidden}
      size={size}
      tint={tint}
      weight={weight}
      {...rest}
    >
      {children}
    </StyledTypography>
  );
};

Typography.displayName = "Typography";

export default Typography;
