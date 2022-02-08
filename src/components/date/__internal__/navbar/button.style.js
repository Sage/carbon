import styled from "styled-components";
import baseTheme from "../../../../style/themes/base";

const StyledButton = styled.button.attrs({ type: "button" })`
  align-items: center;
  display: block;
  border: none;
  background: none;
  box-shadow: none;
  cursor: pointer;
  height: 40px;
  width: 40px;
  padding: 0;
  &:focus {
    outline: ${({ theme }) => `3px solid ${theme.colors.focus}`};
  }
`;

StyledButton.defaultProps = {
  theme: baseTheme,
};

export default StyledButton;
