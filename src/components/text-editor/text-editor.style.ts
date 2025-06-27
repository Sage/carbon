import styled, { css } from "styled-components";

import { margin, MarginProps } from "styled-system";
import addFocusStyling from "../../style/utils/add-focus-styling";

type StyledTextEditorWrapperProps = MarginProps;

interface StyledEditorToolbarWrapperProps {
  focused?: boolean;
  error?: boolean;
}

export const StyledTextEditor = styled.div`
  position: relative;
`;

export const StyledTextEditorWrapper = styled.div<StyledTextEditorWrapperProps>`
  margin-bottom: var(--fieldSpacing);
  ${margin}
`;

export const StyledWrapper = styled.div`
  position: relative;

  .textBold {
    font-weight: bold;
  }
  .textItalic {
    font-style: italic;
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
  ${({ focused, error }) => css`
    border-radius: var(--borderRadius100);
    outline: 1px solid var(--colorsUtilityMajor200);

    ${error &&
    css`
      outline: none;
      border: 2px solid var(--colorsSemanticNegative500);
    `}

    ${focused && addFocusStyling()}
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
