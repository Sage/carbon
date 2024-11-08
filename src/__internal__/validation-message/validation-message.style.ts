import styled, { css } from "styled-components";

interface StyledValidationMessageProps {
  isWarning?: boolean;
  isDarkBackground?: boolean;
}

const StyledValidationMessage = styled.p<StyledValidationMessageProps>`
  ${({ isWarning, isDarkBackground }) => {
    const darkBgColour = isDarkBackground
      ? "var(--colorsSemanticNegative450)"
      : "var(--colorsSemanticNegative500)";
    return css`
      color: ${isWarning ? "var(--colorsSemanticCaution600)" : darkBgColour};
      font-weight: ${isWarning ? "normal" : "500"};
      margin-top: 0px;
      margin-bottom: 8px;
    `;
  }}
`;

export default StyledValidationMessage;
