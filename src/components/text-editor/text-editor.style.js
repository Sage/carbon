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
  ${({ theme, hasError, rows, hasPreview }) => css`
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
      background-color: ${theme.colors.white};
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

    background-color: ${theme.colors.white};
    outline: ${hasError
      ? `2px solid ${theme.colors.error};`
      : `1px solid ${theme.editor.border};`};
  `}
`;

StyledEditorContainer.defaultProps = {
  theme: baseTheme,
};

const StyledEditorOutline = styled.div`
  ${({ theme, isFocused, hasError }) => css`
    outline: none;
    min-width: 320px;

    ${isFocused &&
    css`
      outline: 3px solid ${theme.colors.focus};
      outline-offset: ${hasError ? "2px;" : "1px;"};
    `}
  `}
`;

StyledEditorOutline.defaultProps = {
  theme: baseTheme,
};

export { StyledEditorWrapper, StyledEditorContainer, StyledEditorOutline };
