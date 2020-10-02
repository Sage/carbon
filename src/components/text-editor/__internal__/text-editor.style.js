import styled, { css } from 'styled-components';
import { isDLS } from '../../../utils/helpers/style-helper';
import baseTheme from '../../../style/themes/base';

const StyledEditorContainer = styled.div`
  ${({ theme, isFocused }) => css`
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

      .text-editor-block-ordered {
        position: relative;
        left: -4px;
        padding-left: 4px;
      }

      .text-editor-block-unordered {
        position: relative;
      }
    }

    div.public-DraftEditor-content {
      padding: 8px;
    }
  
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.editor.border};
    ${isDLS(theme) && isFocused && `outline: 3px solid ${theme.colors.focus};`}
  `}
`;

StyledEditorContainer.defaultProps = {
  theme: baseTheme
};

export default StyledEditorContainer;
