import styled, { css } from "styled-components";
import Box from "../box";
import { toColor } from "../../style/utils/color";
import StyledIcon from "../icon/icon.style";

export default styled(Box)`
  ${({ hasBorderLeftHighlight, theme }) => css`
    word-break: break-word;

    border: 1px solid ${toColor(theme, "slateTint80")};

    ${hasBorderLeftHighlight &&
    `
      border-left: none;
      box-shadow: -4px 0 0 0 ${toColor(theme, "slateTint20")};
    `}

    ${StyledIcon}:hover {
      color: ${theme.palette.slate};
    }
  `}
`;
