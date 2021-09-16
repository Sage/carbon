import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";

const StyledValidationMessage = styled.p`
  ${({ theme, isWarning }) => css`
    color: ${isWarning ? theme.colors.warningText : theme.colors.error};
    font-weight: ${isWarning ? "regular" : "bold"};
    margin-top: 0px;
    margin-bottom: 8px;
  `}
`;

StyledValidationMessage.defaultProps = {
  theme: baseTheme,
};

export default StyledValidationMessage;
