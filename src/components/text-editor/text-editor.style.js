import styled, { css } from "styled-components";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import { isSafari } from "../../__internal__/utils/helpers/browser-type-check";

const lineHeight = 21;

const StyledEditorWrapper = styled.div`
  ${margin}
`;

StyledEditorWrapper.defaultProps = {
  theme: baseTheme,
};

const StyledEditorContainer = styled.div`
  border-radius: var(--borderRadius050);

  ${({ hasError, rows, hasPreview }) => css`
    min-height: ${rows
      ? `${rows * lineHeight}`
      : `${hasPreview ? 125 : 220}`}px;
    min-width: 320px;
    position: relative;

    div.DraftEditor-root {
      min-height: inherit;
      height: 100%;
      min-width: 290px;
      margin: 4px;
    }

    div.DraftEditor-editorContainer,
    div.public-DraftEditor-content {
      min-height: inherit;
      height: 100%;
      min-width: 290px;
      background-color: var(--colorsUtilityYang100);
      line-height: ${lineHeight}px;

      ${!isSafari(navigator) &&
      css`
        .text-editor-block-ordered {
          position: relative;
          left: -4px;
          padding-left: 4px;
        }

        .text-editor-block-unordered {
          position: relative;
        }
      `}
    }

    div.public-DraftEditor-content {
      padding: 14px 8px;
    }

    background-color: var(--colorsUtilityYang100);
    outline: ${hasError
      ? "2px solid var(--colorsSemanticNegative500)"
      : "1px solid var(--colorsUtilityMajor200)"};
  `}
`;

const StyledEditorOutline = styled.div`
  ${({ isFocused, hasError }) => css`
    border-radius: var(--borderRadius050);
    outline: none;
    min-width: 320px;

    ${isFocused &&
    css`
      outline: 3px solid var(--colorsSemanticFocus500);
      outline-offset: ${hasError ? "2px;" : "1px;"};
    `}
  `}
`;

export { StyledEditorWrapper, StyledEditorContainer, StyledEditorOutline };
