import React from "react";
import { SpaceProps } from "styled-system";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import { default as NextTypography } from "./__internal__/__next__/";
import type { TypographyProps as NextTypographyProps } from "./__internal__/__next__";
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
  as?: React.ElementType;
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
   * @deprecated Use the new `size` prop for paragraphs or choose the appropriate variant for other variants. This prop will eventually be removed.
   * Override the variant font-size */
  fontSize?: string;
  /**
   * @deprecated Use the new `weight` prop for paragraphs or choose the appropriate variant for other variants. This prop will eventually be removed.
   * Override the variant font-weight */
  fontWeight?: string;
  /**
   * @deprecated Use the new `size` prop for paragraphs or choose the appropriate variant for other variants. This prop will eventually be removed.
   * Override the variant line-height */
  lineHeight?: string;
  /** Override the variant text-transform */
  textTransform?: string;
  /** Override the variant text-decoration */
  textDecoration?: string;
  /** Override the variant display */
  display?: string;
  /**
   * @deprecated Use semantic HTML instead. This prop will eventually be removed.
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
   * @deprecated Use the `inverse` or `tint` props instead. This prop will eventually be removed.
   * Override the color style */
  color?: string;
  /**
   * @deprecated This prop will eventually be removed.
   * Override the backgroundColor style */
  backgroundColor?: string;
  /**
   * @deprecated This prop will eventually be removed.
   * Override the bg value shorthand for backgroundColor */
  bg?: string;
  /**
   * @deprecated Use the `tint` prop on paragraph elements instead. This prop will eventually be removed.
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

const getAs = (variant?: VariantTypes) => {
  switch (variant) {
    case "h1-large":
      return "h1";
    case "segment-header":
    case "segment-header-small":
    case "segment-subheader":
    case "segment-subheader-alt":
      return "h5";
    case "big":
      return "p";
    default:
      return variant;
  }
};

/**
 * @deprecated This component is deprecated and will be removed in a future release.
 * Please use the Typography component from `carbon-react/__next__` instead, which provides improved
 * semantic variants (h1, h2, h3, h4, h5, section-heading, section-subheading, and p) and better
 * design token alignment.
 */
export const Typography = ({
  variant = "p",
  as,
  children,
  ...rest
}: TypographyProps) => {
  if (!typographyLegacyWarned) {
    Logger.warn(
      "Warning: This version of the `Typography` component is intended to help migration to the `next` version and will be removed in a future release.",
    );
    typographyLegacyWarned = true;
  }
  const nextVariant = getNextVariant(variant);

  // Renders the next version of Typography, rest is spread, this means only supported props will be applied to the next version. All unsupported props will be filtered out.
  return (
    <NextTypography
      variant={nextVariant}
      as={as || (getAs(variant) as any)}
      {...(rest as any)}
    >
      {children}
    </NextTypography>
  );
};

Typography.displayName = "Typography";

export default Typography;
