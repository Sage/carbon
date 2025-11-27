import React from "react";
import { SpaceProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import {
  filterStyledSystemMarginProps,
  filterStyledSystemPaddingProps,
} from "../../style/utils";
import NextTypography from "./__next__/typography.component";
import type {
  TypographyProps as NextTypographyProps,
  ValidHtmlVariant,
  LegacyValidHtmlVariant,
} from "./__next__/typography.component";
import Logger from "../../__internal__/utils/logger";

export const VARIANT_TYPES = [
  "h1-large",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "segment-header",
  "segment-header-small",
  "segment-subheader",
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
  as?: React.ElementType | ValidHtmlVariant;
  /** Set the ID attribute of the Typography component */
  id?: string;
  /** Content to be rendered inside the Typography component */
  children?: React.ReactNode;
  /**
   * The visual style to apply to the component.
   *
   * The following variant values are deprecated:
   * - "h1-large" → use the "h1" variant instead
   * - "segment-header" → use the "section-heading" variant instead
   * - "segment-header-small" → use the "section-subheading" variant instead
   * - "segment-subheader" → use the "h5" variant instead
   * - "segment-subheader-alt" → use the "h5" variant instead
   * - "span", "small", "big", "sup", "sub", "strong", "b", "em" → use the "p" variant instead
   * - "ul", "ol" → use proper semantic HTML list elements with the "p" variant inside instead
   *
   * Migrate to the next version of Typography (from carbon-react/__next__) which uses semantic variants:
   * h1, h2, h3, h4, h5, section-heading, section-subheading and p
   */
  variant?: VariantTypes;
  /**
   * @deprecated Support for custom font sizes has been removed. Use the new `size` prop for paragraphs or choose the appropriate variant for other variants.
   * Override the variant font-size */
  fontSize?: string;
  /**
   * @deprecated Support for custom font weights has been removed. Use the new `weight` prop for paragraphs or choose the appropriate variant for other variants.
   * Override the variant font-weight */
  fontWeight?: string;
  /**
   * @deprecated Support for custom line heights has been removed. Use the new `size` prop for paragraphs or choose the appropriate variant for other variants.
   * Override the variant line-height */
  lineHeight?: string;
  /** Override the variant text-transform */
  textTransform?: string;
  /** Override the variant text-decoration */
  textDecoration?: string;
  /** Override the variant display */
  display?: string;
  /**
   * @deprecated Support for custom list styles has been removed. Use semantic HTML instead.
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
   * @deprecated Support for truncate has been deprecated. Use `textOverflow` and `whiteSpace` props instead.
   * Apply truncation */
  truncate?: boolean;
  /**
   * @deprecated Support for custom colors has been removed. Use the `inverse` or `tint` props instead.
   * Override the color style */
  color?: string;
  /**
   * @deprecated Support for background colors has been removed.
   * Override the backgroundColor style */
  backgroundColor?: string;
  /**
   * @deprecated Support for bg has been removed.
   * Override the bg value shorthand for backgroundColor */
  bg?: string;
  /**
   * @deprecated Support for custom opacity has been removed. Use the `tint` prop on paragraph elements instead.
   * Override the opacity value */
  opacity?: string | number;
  /** Set whether it will be visually hidden
   * NOTE: This is for screen readers only and will make a lot of the other props redundant */
  screenReaderOnly?: boolean;
  /**
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

let typographyLegacyWarned = false;

// Maps deprecated variants to new semantic variants to avoid breaking changes
const getNextVariant = (
  variant?: VariantTypes,
): NextTypographyProps["variant"] => {
  switch (variant) {
    case "h1":
    case "h1-large":
      return "h1";
    case "h2":
    case "h3":
    case "h4":
      return variant;
    case "segment-header":
      return "section-heading";
    case "segment-header-small":
      return "section-subheading";
    case "h5":
    case "segment-subheader":
    case "segment-subheader-alt":
      return "h5";
    default:
      return "p";
  }
};

/* Returns the variant if it's a valid semantic HTML element, ensuring deprecated variants render the correct underlying HTML structure */
const getSemanticElement = (
  variant?: VariantTypes,
): ValidHtmlVariant | LegacyValidHtmlVariant | undefined => {
  switch (variant) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "p":
    case "span":
    case "strong":
    case "b":
    case "em":
    case "small":
    case "sub":
    case "sup":
    case "ul":
    case "ol":
      return variant as LegacyValidHtmlVariant;
    default:
      return undefined;
  }
};

/**
 * @deprecated This component is deprecated and will be removed in a future release.
 * Please use the Typography component from `carbon-react/__next__` instead, which provides improved
 * semantic variants (h1, h2, h3, h4, h5, section-heading, section-subheading, and p) and better
 * design token alignment.
 */
export const Typography = ({
  "data-component": dataComponent,
  variant = "p",
  as,
  id,
  fluid = false,
  inverse = false,
  fontSize,
  fontWeight,
  textTransform,
  lineHeight,
  textDecoration,
  display,
  listStyleType,
  whiteSpace,
  wordBreak,
  wordWrap,
  textAlign,
  textOverflow,
  overflow,
  truncate,
  color,
  backgroundColor,
  bg,
  opacity,
  children,
  screenReaderOnly,
  size = "regular",
  tint = "default",
  weight = "regular",
  "aria-live": ariaLive,
  role,
  "aria-hidden": ariaHidden,
  className,
  ...rest
}: TypographyProps) => {
  if (!typographyLegacyWarned) {
    Logger.warn(
      "Warning: This version of the `Typography` component is intended to help migration to the `next` version and will be removed in a future release.",
    );
    typographyLegacyWarned = true;
  }

  const nextVariant = getNextVariant(variant);
  const finalAs = as || getSemanticElement(variant);

  /* Only forwarding CSS properties that are supported by the new component.
  Properties like `fontSize`, `fontWeight`, `lineHeight` and `listStyleType` are accepted for backward compatibility
  but not forwarded to the new component as they can conflict with design tokens */

  const cssProps: Record<string, string> = {};

  if (textTransform !== undefined) cssProps.textTransform = textTransform;
  if (textDecoration !== undefined) cssProps.textDecoration = textDecoration;
  if (display !== undefined) cssProps.display = display;
  if (whiteSpace !== undefined) cssProps.whiteSpace = whiteSpace;
  if (wordBreak !== undefined) cssProps.wordBreak = wordBreak;
  if (wordWrap !== undefined) cssProps.wordWrap = wordWrap;
  if (textAlign !== undefined) cssProps.textAlign = textAlign;
  if (textOverflow !== undefined) cssProps.textOverflow = textOverflow;
  if (overflow !== undefined) cssProps.overflow = overflow;

  if (truncate) {
    cssProps.whiteSpace = "nowrap";
    cssProps.overflow = "hidden";
    cssProps.textOverflow = "ellipsis";
  }

  return (
    <NextTypography
      variant={nextVariant}
      as={finalAs as ValidHtmlVariant | LegacyValidHtmlVariant}
      id={id}
      {...cssProps}
      screenReaderOnly={screenReaderOnly}
      aria-hidden={ariaHidden}
      className={className}
      role={role}
      aria-live={ariaLive}
      size={size}
      tint={tint}
      weight={weight}
      fluid={fluid}
      inverse={inverse}
      {...tagComponent(dataComponent, rest)}
      {...filterStyledSystemMarginProps(rest)}
      {...filterStyledSystemPaddingProps(rest)}
    >
      {children}
    </NextTypography>
  );
};

Typography.displayName = "Typography";

export default Typography;
