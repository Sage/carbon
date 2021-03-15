import styled from "styled-components";
import baseTheme from "../../../style/themes/base";
import { ButtonWithForwardRef } from "../../button";

const StyledPicklistItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 20, 29, 0.15),
    0 3px 3px 0 rgba(0, 20, 29, 0.2);
  background-color: ${({ theme }) => theme.colors.white};

  & + & {
    margin-top: 8px;
  }
`;

const StyledButton = styled(ButtonWithForwardRef)`
  padding: 0;
  margin-right: 0;
  margin-left: auto;
  height: 40px;
  min-width: 40px;
`;

StyledPicklistItem.defaultProps = { theme: baseTheme };
StyledButton.defaultProps = { theme: baseTheme };

export { StyledPicklistItem, StyledButton };
