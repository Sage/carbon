import styled, { css } from "styled-components";
import { StyledForm, StyledFormContent } from "../form/form.style";

type StyledContentProps = {
  hasHeader: boolean;
  disableContentPadding?: boolean;
};

const generatePaddingVariables = (px: number) => css`
  padding-top: 0;
  padding-left: ${px}px;
  padding-right: ${px}px;
  padding-bottom: 0;
`;

const stickyFormOverrides = (px: number) => css`
  ${StyledForm}.sticky {
    margin-left: calc(-1 * ${px}px);
    margin-right: calc(-1 * ${px}px);

    ${StyledFormContent} {
      ${generatePaddingVariables(px)};
    }
  }
`;

const StyledContent = styled.div<StyledContentProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  flex: 1;
  width: 100%;

  ${generatePaddingVariables(16)}
  ${stickyFormOverrides(16)}

  ${({ disableContentPadding }) => css`
    ${!disableContentPadding &&
    css`
      @media screen and (min-width: 600px) {
        ${generatePaddingVariables(24)}
        ${stickyFormOverrides(24)}
      }
      @media screen and (min-width: 960px) {
        ${generatePaddingVariables(32)}
        ${stickyFormOverrides(32)}
      }
      @media screen and (min-width: 1260px) {
        ${generatePaddingVariables(40)}
        ${stickyFormOverrides(40)}
      }
    `}

    ${disableContentPadding &&
    css`
      ${generatePaddingVariables(0)}
      ${stickyFormOverrides(0)}
    `}
  `}

  ${({ hasHeader }) =>
    !hasHeader &&
    css`
      padding-top: 0;
      margin-top: -25px;
    `}
`;

export default StyledContent;
