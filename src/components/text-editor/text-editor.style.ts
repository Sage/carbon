import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";

type StyledTextEditorWrapperProps = MarginProps;

interface StyledEditorToolbarWrapperProps {
  error?: boolean;
}

export const StyledTextEditor = styled.div<{ error?: boolean }>`
  position: relative;
  box-sizing: border-box;
  ${({ error }) =>
    error &&
    css`
      margin: -1px;
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
  ${({ error }) =>
    error
      ? css`
          border: 1px solid var(--colorsUtilityMajor200);
        `
      : css`
          outline: 1px solid var(--colorsUtilityMajor200);
        `}
`;

export const StyledHeaderWrapper = styled.div`
  padding: var(--spacing200);
`;

export const StyledFooterWrapper = styled.div`
  border-top: 1px solid var(--colorsUtilityMajor200);
  padding: var(--spacing200);
`;

export default StyledTextEditor;
