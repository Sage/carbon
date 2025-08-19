import styled, { css } from "styled-components";

import { margin, MarginProps } from "styled-system";

type StyledTextEditorWrapperProps = MarginProps;

interface StyledEditorToolbarWrapperProps {
  error?: boolean;
}

export const StyledTextEditor = styled.div<{ error?: boolean }>`
  ${({ error }) => css`
    position: relative;

    ${error &&
    css`
      outline: none;
      border: 2px solid var(--colorsSemanticNegative500);
      border-bottom-left-radius: var(--borderRadius100);
      border-bottom-right-radius: var(--borderRadius100);
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    `}
  `}
`;

export const StyledTextEditorWrapper = styled.div<StyledTextEditorWrapperProps>`
  margin-bottom: var(--fieldSpacing);
  ${margin}
  min-width: 288px;
`;

export const StyledWrapper = styled.div`
  position: relative;

  .textBold {
    font-weight: bold;
  }

  .textItalic {
    font-style: italic;
  }

  .textUnderline {
    text-decoration: underline;
  }

  a:not([data-component="link-preview"]) {
    color: var(--colorsActionMajor500);
    cursor: pointer;

    &:hover {
      color: var(--colorsActionMajor600);
    }

    &:focus {
      outline: none;
      text-decoration: none;
      color: var(--colorsActionMajorYin090);
      background-color: var(--colorsSemanticFocus250);
      border-radius: var(--borderRadius025);
      box-shadow: 0 var(--spacing050) 0 0 var(--colorsUtilityYin090);
    }
  }
`;

export const StyledEditorToolbarWrapper = styled.div<StyledEditorToolbarWrapperProps>`
  border-radius: var(--borderRadius100);
  outline: 1px solid var(--colorsUtilityMajor200);
`;

export const StyledHeaderWrapper = styled.div`
  padding: var(--spacing200);
`;

export const StyledFooterWrapper = styled.div`
  border-top: 1px solid var(--colorsUtilityMajor200);
  padding: var(--spacing200);
`;

export default StyledTextEditor;
