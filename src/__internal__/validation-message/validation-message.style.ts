import styled, { css } from "styled-components";

interface StyledValidationMessageProps {
  isWarning?: boolean;
  isDarkBackground?: boolean;
  validationMessagePositionTop?: boolean;
}

const StyledValidationMessage = styled.p<StyledValidationMessageProps>`
  ${({ isWarning, isDarkBackground, validationMessagePositionTop }) => {
    const darkBgColour = isDarkBackground
      ? "var(--colorsSemanticNegative450)"
      : "var(--colorsSemanticNegative500)";
    return css`
      color: ${isWarning ? "var(--tempColorsSemanticCaution600)" : darkBgColour};
      font-weight: ${isWarning ? "normal" : "500"};
      margin: 0px;
      margin-${validationMessagePositionTop ? "bottom" : "top"}: 8px;
    `;
  }}
`;

export default StyledValidationMessage;
