import styled from 'styled-components';
import { isDLS } from '../../utils/helpers/style-helper';
import baseTheme from '../../style/themes/base';

const StyledEditorWrapper = styled.div`
  margin: 0px 4px;
`;

const StyledEditorContainer = styled.div`
  min-height: 180px;
  
  div.DraftEditor-root {
    min-height: inherit;
    height: 100%;
  }
  div.DraftEditor-editorContainer,
  div.public-DraftEditor-content {
    min-height: inherit;
    height: 100%;
  }
  
  ${({ theme, isFocused }) => `
    background-color: ${theme.colors.white};
    padding: 2px ${theme.spacing}px;
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
