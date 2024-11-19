import styled, { css } from "styled-components";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import { isSafari } from "../../__internal__/utils/helpers/browser-type-check";
import addFocusStyling from "../../style/utils/add-focus-styling";

const lineHeight = 21;

const StyledEditorWrapper = styled.div`
  ${margin}
`;

StyledEditorWrapper.defaultProps = {
  theme: baseTheme,
};

const StyledEditorContainer = styled.div<{
  hasError?: boolean;
  rows?: number;
  hasPreview?: boolean;
}>`
  ${({ hasError, rows, hasPreview }) => css`
    border-radius: var(--borderRadius050);
    min-height: ${rows
      ? `${rows * lineHeight}`
      : `${hasPreview ? 125 : 220}`}px;
    position: relative;

    div.DraftEditor-root {
      min-height: inherit;
      height: 100%;
      margin: 4px;
    }

    div.DraftEditor-editorContainer,
    div.public-DraftEditor-content {
      min-height: inherit;
      height: 100%;
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

const StyledEditorOutline = styled.div<{
  isFocused?: boolean;
  hasError?: boolean;
}>`
  ${({ isFocused, hasError }) => css`
    border-radius: var(--borderRadius050);
    outline: none;

    ${isFocused &&
    css`
      ${addFocusStyling()}
    `}
  `}
`;

export { StyledEditorWrapper, StyledEditorContainer, StyledEditorOutline };
