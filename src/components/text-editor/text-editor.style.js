import styled, { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';
import baseTheme from '../../style/themes/base';

const StyledEditorWrapper = styled.div`
  padding: 4px;
`;

const StyledEditorContainer = styled.div`
  min-height: 220px;
  min-width: 450px;
  margin-right: 2px;
  
  div.DraftEditor-root {
    min-height: inherit;
    height: 100%;
    width: 100%;
    min-width: 450px;
  }

  div.DraftEditor-editorContainer,
  div.public-DraftEditor-content {
    padding: 8px;
    min-height: inherit;
    height: 100%;
    min-width: 420px;
  }

  .public-DraftEditorPlaceholder-root {
    position: absolute;
    height: 21px;
    top: 16px;
    left 16px;
    width: fit-content;
    min-width: 450px;
    ${({ theme }) => css`
      color: ${theme.editor.placeholder};
    `}
  }

  .public-DraftEditorPlaceholder-inner {
    width: fit-content;
  }
  
  ${({ theme, isFocused, showPlaceholder }) => css`
    .public-DraftEditorPlaceholder-root {
      display: inline-block;
      ${(isFocused || !showPlaceholder) && css`
        display: none;
      `}
    }

    background-color: ${theme.colors.white};
    border: 1px solid ${theme.editor.border};
    ${!isClassic(theme) && isFocused && `outline: 3px solid ${theme.colors.focus};`}
  `}
`;

StyledEditorWrapper.defaultProps = {
  theme: baseTheme
};

export {
  StyledEditorWrapper,
  StyledEditorContainer
};
