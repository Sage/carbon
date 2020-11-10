import styled, { css } from "styled-components";

import StyledValidationicon from "../../../components/validations/validation-icon.style";
import baseTheme from "../../../style/themes/base";

const BORDER_WIDTH = 2;
const getRoundedMaxWidth = (maxWidth, childWidth) =>
  Math.floor(maxWidth / childWidth) * childWidth;

const StyledContent = styled.div`
  display: flex;
  align-items: center;

  ${StyledValidationicon} {
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

  ${({ theme, error, info, warning }) => {
    if (error)
      return css`
        outline: 2px solid ${theme.colors.error};
      `;
    if (warning)
      return css`
        outline: 1px solid ${theme.colors.warning};
      `;
    if (info)
      return css`
        outline: 1px solid ${theme.colors.info};
      `;
    return "";
  }}
`;
StyledColorOptions.defaultProps = { theme: baseTheme };

export { StyledContent, StyledColorOptions };
