import styled, { css } from "styled-components";

interface StyledValidationMessageProps {
  isWarning?: boolean;
}

const StyledValidationMessage = styled.p<StyledValidationMessageProps>`
  ${({ isWarning }) => css`
    color: ${isWarning
      ? "var(--colorsSemanticCaution600)"
      : "var(--colorsSemanticNegative500)"};
    font-weight: ${isWarning ? "normal" : "bold"};
    margin-top: 0px;
    margin-bottom: 8px;
  `}
`;

export default StyledValidationMessage;
