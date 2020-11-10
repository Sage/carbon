import styled, { css } from "styled-components";
import { isDLS } from "../../../utils/helpers/style-helper";
import baseTheme from "../../../style/themes/base";
import { isSafari } from "../../../utils/helpers/browser-type-check";

const StyledEditorContainer = styled.div`
  ${({ theme, hasError }) => css`
    min-height: 220px;
    min-width: 320px;

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
      line-height: 21px;

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
    ${isDLS(theme) &&
    isFocused &&
    `
      outline: 3px solid ${theme.colors.focus};
      outline-offset: ${hasError ? "2px;" : "1px;"}
    `}
  `}
`;

StyledEditorOutline.defaultProps = {
  theme: baseTheme,
};

export { StyledEditorContainer, StyledEditorOutline };
