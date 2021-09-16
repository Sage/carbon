import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";

interface StyledValidationMessageProps {
  isWarning?: boolean;
}

const StyledValidationMessage = styled.p<StyledValidationMessageProps>`
  ${({ isWarning }) => css`
    color: ${isWarning
      ? "var(--colorsSemanticCaution600)"
      : "var(--colorsSemanticNegative500)"};
    font-weight: ${isWarning ? "regular" : "bold"};
    margin-top: 0px;
    margin-bottom: 8px;
  `}
`;

StyledValidationMessage.defaultProps = {
  theme: baseTheme,
};

export default StyledValidationMessage;
