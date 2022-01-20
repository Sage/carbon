import styled, { css } from "styled-components";

const StyledValidationMessage = styled.p`
  ${({ isWarning }) => css`
    color: ${isWarning
      ? "var(--colorsSemanticCaution600)"
      : "var(--colorsSemanticNegative500)"};
    font-weight: ${isWarning ? "regular" : "bold"};
    margin-top: 0px;
    margin-bottom: 8px;
  `}
`;

export default StyledValidationMessage;
