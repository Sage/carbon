import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import applyBaseTheme from "../../../../style/themes/apply-base-theme";
import {
  AllowedCSSTextOverrides,
  TypographyProps,
} from "./typography.component";
import visuallyHidden from "../../../../style/utils/visually-hidden";

type HeadingVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "section-heading"
  | "section-subheading";

const headingVariants: Record<HeadingVariants, string> = {
  h1: "heading-l",
  h2: "heading-m",
  h3: "heading-s",
  h4: "subheading-l",
  h5: "subheading-m",
  "section-heading": "section-heading-m",
  "section-subheading": "section-heading-s",
};

export interface StyledTypographyProps extends SpaceProps {
  $variant?: TypographyProps["variant"];
  $fluid?: TypographyProps["fluid"];
  $inverse?: TypographyProps["inverse"];
  $screenReaderOnly?: TypographyProps["screenReaderOnly"];
  $size?: TypographyProps["size"];
  $color: NonNullable<TypographyProps["color"]>;
  $weight?: TypographyProps["weight"];
  $display?: AllowedCSSTextOverrides["display"];
  $whiteSpace?: AllowedCSSTextOverrides["whiteSpace"];
  $wordBreak?: AllowedCSSTextOverrides["wordBreak"];
  $wordWrap?: AllowedCSSTextOverrides["wordWrap"];
  $textAlign?: AllowedCSSTextOverrides["textAlign"];
  $textDecoration?: AllowedCSSTextOverrides["textDecoration"];
  $textOverflow?: AllowedCSSTextOverrides["textOverflow"];
  $textTransform?: AllowedCSSTextOverrides["textTransform"];
  $overflow?: AllowedCSSTextOverrides["overflow"];
}

const StyledTypography = styled.span.attrs(
  applyBaseTheme,
)<StyledTypographyProps>`
  ${({
    $display,
    $variant,
    $fluid,
    $inverse,
    $size,
    $color,
    $weight,
    $whiteSpace,
    $wordBreak,
    $wordWrap,
    $textAlign,
    $textDecoration,
    $textOverflow,
    $textTransform,
    $overflow,
    $screenReaderOnly,
  }) => {
    const fontType = $fluid ? "fluid" : "static";
    const sizeValue = $size === "M" ? "m" : "l";
    const colorTokenMap = {
      neutral: `var(--page-content${$inverse ? "-inverse" : ""}-txt-default)`,
      subtle: `var(--page-content${$inverse ? "-inverse" : ""}-txt-alt)`,
      // TODO: Switch to inverse semantic text tokens when page-level inverse aliases are available.
      caution: "var(--page-content-caution-txt)",
      info: "var(--page-content-info-txt)",
      negative: "var(--page-content-negative-txt)",
      positive: "var(--page-content-positive-txt)",
    } as const;
    const baseColorToken = colorTokenMap[$color];
    const isHeading = $variant && $variant in headingVariants;
    const isStrongOrBold = $variant === "strong" || $variant === "b";
    const isSuperOrSub = $variant === "sup" || $variant === "sub";
    const headingFontVar = `--global-font-${fontType}-${isHeading ? headingVariants[$variant as HeadingVariants] : ""}`;
    const bodyMediumFontVar = `--global-font-${fontType}-body-medium-${sizeValue}`;
    const bodyFontVar = `--global-font-${fontType}-body-${$weight}-${sizeValue}`;

    return css`
      /* Margin is unset as browsers can add default margin based on the underlying HTML element,
      this can cause a disconnect between the styling added via underlying element (as prop) opposed to the 
      styling added via the variant prop. Consumers can pass their own margin instead if needed. */
      ${!$screenReaderOnly && "margin: unset;"}
      ${space}
      ${$screenReaderOnly && visuallyHidden}

      /*  Following styles are the only styles we currently support, more can be added at a later date */
      ${$display !== undefined && `display: ${$display};`}
      ${$whiteSpace !== undefined && `white-space: ${$whiteSpace};`}
      ${$wordBreak !== undefined && `word-break: ${$wordBreak};`}
      ${$wordWrap !== undefined && `word-wrap: ${$wordWrap};`}
      ${$textAlign !== undefined && `text-align: ${$textAlign};`}
      ${$textDecoration !== undefined && `text-decoration: ${$textDecoration};`}
      ${$textOverflow !== undefined && `text-overflow: ${$textOverflow};`}
      ${$textTransform !== undefined && `text-transform: ${$textTransform};`}
      ${$overflow !== undefined && `overflow: ${$overflow};`}

      ${isHeading &&
      css`
        font: var(${headingFontVar});
        color: ${baseColorToken};
      `}

      ${isStrongOrBold &&
      css`
        font: var(${bodyMediumFontVar});
        color: ${baseColorToken};
      `}

      ${$variant === "sup" &&
      css`
        font: var(${bodyFontVar});
        font-size: 0.75em;
        color: ${baseColorToken};
        vertical-align: super;
      `}

      ${$variant === "sub" &&
      css`
        font: var(${bodyFontVar});
        font-size: 0.75em;
        color: ${baseColorToken};
        vertical-align: sub;
      `}

      /* base token for body text */
      ${!isHeading &&
      !isStrongOrBold &&
      !isSuperOrSub &&
      css`
        font: var(${bodyFontVar});
        color: ${baseColorToken};
      `}
    `;
  }}
`;

export default StyledTypography;
