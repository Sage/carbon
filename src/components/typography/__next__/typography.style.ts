import styled, { css } from "styled-components";
import { space } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import { TypographyProps } from "./typography.component";
import visuallyHidden from "../../../style/utils/visually-hidden";

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
    const headingColorToken = `var(--container-standard-${inverse ? "inverse" : "standard"}-txt-default)`;
    const paragraphColorToken = `var(--container-${inverse ? "inverse" : "standard"}-txt-${tint})`;

    return css`
      /* Margin is unset as browsers can add default margin based on the underlying HTML element,
      this can cause a disconnect between the styling added via underlying element opposed to the 
      styling added via the variant prop. Consumers can pass their own margin instead if needed. */
      ${!screenReaderOnly && "margin: unset;"}
      ${space}
      ${screenReaderOnly && visuallyHidden}
      ${display !== undefined && `display: ${display};`}
      ${whiteSpace !== undefined && `white-space: ${whiteSpace};`}
      ${wordBreak !== undefined && `word-break: ${wordBreak};`}
      ${wordWrap !== undefined && `word-wrap: ${wordWrap};`}
      ${textAlign !== undefined && `text-align: ${textAlign};`}
      ${textDecoration !== undefined && `text-decoration: ${textDecoration};`}
      ${textOverflow !== undefined && `text-overflow: ${textOverflow};`}
      ${textTransform !== undefined && `text-transform: ${textTransform};`}
      ${overflow !== undefined && `overflow: ${overflow};`}

      ${variant === "h1" &&
      css`
        font: var(--global-font-${fluid ? "fluid" : "static"}-heading-l);
        color: ${headingColorToken};
      `}

      ${variant === "h2" &&
      css`
        font: var(--global-font-${fluid ? "fluid" : "static"}-heading-m);
        color: ${headingColorToken};
      `}

      ${variant === "h3" &&
      css`
        font: var(--global-font-${fluid ? "fluid" : "static"}-heading-s);
        color: ${headingColorToken};
      `}

      ${variant === "h4" &&
      css`
        font: var(--global-font-${fluid ? "fluid" : "static"}-subheading-l);
        color: ${headingColorToken};
      `}

      ${variant === "h5" &&
      css`
        font: var(--global-font-${fluid ? "fluid" : "static"}-subheading-m);
        color: ${headingColorToken};
      `}

      ${variant === "section-heading" &&
      css`
        font: var(--global-font-${fluid ? "fluid" : "static"}-heading-m);
        color: ${headingColorToken};
      `}

      ${variant === "section-subheading" &&
      css`
        font: var(--global-font-${fluid ? "fluid" : "static"}-heading-s);
        color: ${headingColorToken};
      `}

      ${variant === "p" &&
      (() => {
        const fontToken = `--global-font-${fluid ? "fluid" : "static"}-body-${weight}-${size === "regular" ? "m" : "l"}`;
        return css`
          font: var(${fontToken});
          color: ${paragraphColorToken};
        `;
      })()}
    `;
  }}
`;

export default StyledTypography;
