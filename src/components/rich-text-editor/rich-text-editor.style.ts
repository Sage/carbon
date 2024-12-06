import styled, { css } from "styled-components";

interface StyledRichTextEditorWrapperProps {
  error?: boolean | string | undefined;
}

const StyledRichTextEditorError = styled.div`
  color: var(--colorsSemanticNegative500);
  font-weight: 500;
  margin-top: 0px;
  margin-bottom: 8px;
`;

const StyledRichTextEditorWrapper = styled.div<StyledRichTextEditorWrapperProps>`
  position: relative;
  width: 500px;
  ${({ error }) =>
    error &&
    css`
      border-left: 2px solid var(--colorsSemanticNegative500);
      padding-left: 8px;

      /* > #carbon-lexical-rich-text-editor { */
      #error-wrapper {
        border-radius: var(--borderRadius100);
        .carbon-rte-editable,
        #carbon-rich-text-editor-toolbar {
          outline: 2px solid var(--colorsSemanticNegative500);
        }
      }
    `}
`;

const StyledRichTextEditor = styled.div`
  position: relative;
  width: 500px;
`;

export {
  StyledRichTextEditor,
  StyledRichTextEditorWrapper,
  StyledRichTextEditorError,
};
