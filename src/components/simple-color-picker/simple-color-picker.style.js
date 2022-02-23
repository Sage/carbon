import styled, { css } from "styled-components";

import StyledValidationIcon from "../../__internal__/validations/validation-icon.style";

const BORDER_WIDTH = 2;
const getRoundedMaxWidth = (maxWidth, childWidth) =>
  Math.floor(maxWidth / childWidth) * childWidth;

const StyledContent = styled.div`
  display: flex;
  align-items: center;

  ${StyledValidationIcon} {
    margin-left: 4px;
  }
`;

const StyledColorOptions = styled.div`
  max-width: ${({ maxWidth, childWidth }) =>
    getRoundedMaxWidth(maxWidth, childWidth)}px;

  padding: 0;
  display: flex;
  flex-wrap: wrap;
  border-left: ${BORDER_WIDTH}px solid transparent;
  border-top: ${BORDER_WIDTH}px solid transparent;

  ${({ error, info, warning }) => {
    if (error)
      return css`
        outline: var(--borderWidth200) solid var(--colorsSemanticNegative500);
      `;
    if (warning)
      return css`
        outline: var(--borderWidth200) solid var(--colorsSemanticCaution500);
      `;
    if (info)
      return css`
        outline: var(--borderWidth200) solid var(--colorsSemanticInfo500);
      `;
    return "";
  }}
`;

export { StyledContent, StyledColorOptions };
