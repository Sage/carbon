import styled from "styled-components";
import StyledButton from "../../../button/button.style";
import baseTheme from "../../../../style/themes/base";

const StyledToolbar = styled.div`
  padding: 8px;
  display: flex;
  justify-content: flex-start;
  background: white;
  flex-wrap: wrap;
  font-size: 14px;
  user-select: none;
  order: 2;
  border: none;
  ${({ theme }) => `
    background-color: ${theme.editor.toolbar.background};
    border-top: 1px solid ${theme.editor.border};
  `}
  min-width: 290px;
  z-index: 10;
`;

StyledToolbar.defaultProps = {
  theme: baseTheme,
};

const StyledEditorStyleControls = styled.div`
  display: inline-block;
  text-align: left;
  width: 50%;
  min-width: 60px;
  margin-left: -2px;
`;

StyledEditorStyleControls.defaultProps = {
  theme: baseTheme,
};

const StyledEditorActionControls = styled.div`
  display: inline-block;
  text-align: right;
  width: 50%;
  min-width: 60px;

  ${StyledButton} {
    width: 62px;
    min-height: 33px;
  }

  ${StyledButton}:first-of-type {
    font-size: 16px;
  }
`;

StyledEditorActionControls.defaultProps = {
  theme: baseTheme,
};

export { StyledToolbar, StyledEditorActionControls, StyledEditorStyleControls };
