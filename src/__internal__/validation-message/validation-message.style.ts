import styled, { css } from "styled-components";

interface StyledValidationMessageProps {
  isWarning?: boolean;
  isDarkBackground?: boolean;
  validationMessagePositionTop?: boolean;
  isLarge?: boolean;
}

const StyledValidationMessage = styled.p<StyledValidationMessageProps>`
  ${({
    isWarning,
    isDarkBackground,
    validationMessagePositionTop,
    isLarge,
  }) => {
    const darkBgColour = isDarkBackground
      ? "var(--colorsSemanticNegative450)"
      : "var(--colorsSemanticNegative500)";
    return css`
      color: ${isWarning ? "var(--tempColorsSemanticCaution600)" : darkBgColour};
      font-weight: ${isWarning ? "normal" : "500"};
      font-size: ${isLarge ? "var(--fontSizes200)" : "var(--fontSizes100)"};
      margin: 0px;
      margin-${validationMessagePositionTop ? "bottom" : "top"}: 8px;
    `;
  }}
`;

export default StyledValidationMessage;
