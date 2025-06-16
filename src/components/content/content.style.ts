import styled, { css } from "styled-components";

import { MarginProps, margin } from "styled-system";

import applyBaseTheme from "../../style/themes/apply-base-theme";

export type AlignOptions = "left" | "center" | "right";
export type VariantOptions = "primary" | "secondary";

export interface StyledContentProps extends MarginProps {
  /** Aligns the content (left, center or right) */
  align?: AlignOptions;
  /**
   * Over-rides the calculation of body width based on titleWidth.
   * Sometimes we need the body to be full width while keeping a title width similar to other widths
   */
  bodyFullWidth?: boolean;
}

const StyledContent = styled.div.attrs(applyBaseTheme)<StyledContentProps>`
  ${({ bodyFullWidth, align }) => css`
    ${margin}

    & + & {
      margin-top: 15px;
    }

    ${align &&
    css`
      text-align: ${align};
    `}
    ${bodyFullWidth &&
    css`
      text-align: left;
    `}
  `}
`;

export interface StyledContentTitleProps {
  /** Aligns the content (left, center or right) */
  align?: AlignOptions;
  /** Displays the content inline with the title */
  inline?: boolean;
  /** Sets a custom width for the title element */
  titleWidth?: string;
  /** Applies a theme to the Content Value: primary, secondary */
  variant?: VariantOptions;
}

const StyledContentTitle = styled.div<StyledContentTitleProps>`
  ${({ titleWidth, inline, variant, align }) => {
    return css`
      display: ${inline ? "inline-block" : "block"};
      font-weight: 500;
      width: ${titleWidth && `calc(${titleWidth}% - 30px)`};
      text-align: ${!inline && align};

      ${align === "center" &&
      inline &&
      css`
        text-align: right;
        width: calc(50% - 30px);
      `}

      ${variant === "secondary" &&
      css`
        color: var(--colorsUtilityYin055);
        font-weight: normal;
      `}
    `;
  }};
`;

export interface StyledContentBodyProps {
  /** Aligns the content (left, center or right) */
  align?: AlignOptions;
  /**
   * Over-rides the calculation of body width based on titleWidth.
   * Sometimes we need the body to be full width while keeping a title width similar to other widths
   */
  bodyFullWidth?: boolean;
  /** Displays the content inline with the title */
  inline?: boolean;
  /** Sets a custom width for the title element */
  titleWidth?: string;
  /** Applies a theme to the Content Value: primary, secondary */
  variant?: VariantOptions;
}

const StyledContentBody = styled.div<StyledContentBodyProps>`
  ${({ bodyFullWidth, titleWidth, inline, align }) => {
    return css`
      display: ${inline ? "inline-block" : "block"};
      margin-top: 2px;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-weight: normal;

      ${align === "center" &&
      inline &&
      css`
        width: 50%;
      `}
      ${titleWidth &&
      css`
        width: ${100 - Number(titleWidth)}%;
      `}
      ${bodyFullWidth &&
      css`
        width: 100%;
      `}

      ${inline &&
      bodyFullWidth &&
      css`
        margin-top: 15px;
      `}

      ${inline &&
      !bodyFullWidth &&
      css`
        margin-top: 0;
        margin-left: var(--spacing300);
        text-align: left;
      `}
    `;
  }};
`;

export { StyledContent, StyledContentTitle, StyledContentBody };
