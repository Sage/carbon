import styled, { css } from 'styled-components';
import { isDLS } from '../../utils/helpers/style-helper';
import baseTheme from '../../style/themes/base';

const StyledEditorWrapper = styled.div`
  padding: 4px;
`;

const StyledEditorContainer = styled.div`
  min-height: 220px;
  
  div.DraftEditor-root {
    min-height: inherit;
    height: 100%;
  }
  div.DraftEditor-editorContainer,
  div.public-DraftEditor-content {
    padding: 4px;
    min-height: inherit;
    height: 100%;
  }

  .public-DraftEditorPlaceholder-root {
    position: relative;
    top: 8px;
    left 8px;
    width: fit-content;
    ${({ theme }) => css`
      color: ${theme.editor.placeholder};
    `}
  }

  .public-DraftEditorPlaceholder-root:not(.public-DraftEditorPlaceholder-hasFocus) + div.DraftEditor-editorContainer {
    height: 211px;
    min-height: 211px;
  }

  .public-DraftEditorPlaceholder-inner {
    width: fit-content;
  }

  .RichEditor-hidePlaceholder .public-DraftEditorPlaceholder-root {
    display: none;
  }
  
  ${({ theme, isFocused }) => css`
    .public-DraftEditorPlaceholder-root {
      ${isFocused && css`
        display: none;
        height: 211px;
        min-height: 211px;
      `}
    }
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.editor.border};
    ${isDLS(theme) && isFocused && `outline: 3px solid ${theme.colors.focus};`}
  `}
`;

StyledEditorWrapper.defaultProps = {
  theme: baseTheme
};

export {
  StyledEditorWrapper,
  StyledEditorContainer
};
