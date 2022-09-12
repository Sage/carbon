import styled, { css } from "styled-components";
import { margin } from "styled-system";

import { baseTheme } from "../../style/themes";

const StyledContent = styled.div`
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

StyledContent.defaultProps = { theme: baseTheme };

const StyledContentTitle = styled.div`
  ${({ titleWidth, inline, variant, align }) => {
    return css`
      display: ${inline ? "inline-block" : "block"};
      font-weight: bold;
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

const StyledContentBody = styled.div`
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
        margin-left: 30px;
        text-align: left;
      `}
    `;
  }};
`;

export { StyledContent, StyledContentTitle, StyledContentBody };
