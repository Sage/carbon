import styled, { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';
import StyledLabel from '../../__experimental__/components/label/label.style';
import baseTheme from '../../style/themes/base';

const StyledEditorWrapper = styled.div`
  padding: 4px;

  ${StyledLabel} {
    padding-left: 8px;
  }

  ${({ hideLabel }) => hideLabel && css`
    ${StyledLabel} {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
  `}
`;

const StyledEditorContainer = styled.div`
  min-height: 220px;
  min-width: 450px;
  
  div.DraftEditor-root {
    min-height: inherit;
    height: 100%;
    min-width: 444px;
  }

  div.DraftEditor-editorContainer,
  div.public-DraftEditor-content {
    min-height: inherit;
    height: 100%;
    min-width: 420px;
    background-color: #ffffff;
  }

  div.public-DraftEditor-content {
    padding: 12px;
  }

  .public-DraftEditorPlaceholder-inner {
    width: fit-content;
  }
  
  ${({ theme, isFocused }) => css`
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
