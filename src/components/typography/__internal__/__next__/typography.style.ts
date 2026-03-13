import styled, { css } from "styled-components";
import { space } from "styled-system";
import applyBaseTheme from "../../../../style/themes/apply-base-theme";
import { TypographyProps } from "./typography.component";
import visuallyHidden from "../../../../style/utils/visually-hidden";

const headingVariants = {
  h1: "heading-l",
  h2: "heading-m",
  h3: "heading-s",
  h4: "subheading-l",
  h5: "subheading-m",
};

const StyledTypography = styled.span.attrs(applyBaseTheme)<TypographyProps>`
  ${({
    display,
    variant,
    fluid,
    inverse,
    size,
    tint,
    weight,
    whiteSpace,
    wordBreak,
    wordWrap,
    textAlign,
    textDecoration,
    textOverflow,
    textTransform,
    overflow,
    screenReaderOnly,
  }) => {
    const fontType = fluid ? "fluid" : "static";
    const sizeValue = size === "M" ? "m" : "l";
    const headingColorToken = `var(--container-standard${inverse ? "-inverse" : ""}-txt-default)`;
    const baseColorToken = `var(--container-standard${inverse ? "-inverse" : ""}-txt-${tint})`;
    const isHeading = variant && variant in headingVariants;
    const isStrongOrBold = variant === "strong" || variant === "b";
    const isSuperOrSub = variant === "sup" || variant === "sub";
    const headingFontVar = `--global-font-${fontType}-${isHeading ? headingVariants[variant as keyof typeof headingVariants] : ""}`;
    const bodyMediumFontVar = `--global-font-${fontType}-body-medium-${sizeValue}`;
    const bodyFontVar = `--global-font-${fontType}-body-${weight}-${sizeValue}`;

    return css`
      /* Margin is unset as browsers can add default margin based on the underlying HTML element,
      this can cause a disconnect between the styling added via underlying element (as prop) opposed to the 
      styling added via the variant prop. Consumers can pass their own margin instead if needed. */
      ${!screenReaderOnly && "margin: unset;"}
      ${space}
      ${screenReaderOnly && visuallyHidden}

      // Following styles are the only styles we currently support, more can be added at a later date
      ${display !== undefined && `display: ${display};`}
      ${whiteSpace !== undefined && `white-space: ${whiteSpace};`}
      ${wordBreak !== undefined && `word-break: ${wordBreak};`}
      ${wordWrap !== undefined && `word-wrap: ${wordWrap};`}
      ${textAlign !== undefined && `text-align: ${textAlign};`}
      ${textDecoration !== undefined && `text-decoration: ${textDecoration};`}
      ${textOverflow !== undefined && `text-overflow: ${textOverflow};`}
      ${textTransform !== undefined && `text-transform: ${textTransform};`}
      ${overflow !== undefined && `overflow: ${overflow};`}

      ${isHeading &&
      css`
        font: var(${headingFontVar});
        color: ${headingColorToken};
      `}

      ${isStrongOrBold &&
      css`
        font: var(${bodyMediumFontVar});
        color: ${baseColorToken};
      `}

      ${variant === "sup" &&
      css`
        font: var(${bodyFontVar});
        font-size: 0.75em !important;
        color: ${baseColorToken};
        vertical-align: super;
      `}

      ${variant === "sub" &&
      css`
        font: var(${bodyFontVar});
        font-size: 0.75em !important;
        color: ${baseColorToken};
        vertical-align: sub;
      `}

      // base token for body text
      ${!isHeading &&
      !isStrongOrBold &&
      !isSuperOrSub &&
      variant !== "ul" &&
      variant !== "ol" &&
      css`
        font: var(${bodyFontVar});
        color: ${baseColorToken};
      `}
    `;
  }}
`;

export default StyledTypography;
