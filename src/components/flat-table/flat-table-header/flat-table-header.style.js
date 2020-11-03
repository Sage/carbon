import styled, { css } from "styled-components";
import { space } from "styled-system";

import baseTheme from "../../../style/themes/base";

const StyledFlatTableHeader = styled.th`
  ${({ align, theme, colWidth }) => css`
    background-color: transparent;
    border-width: 0;
    border-bottom: 1px solid ${theme.table.secondary};
    box-sizing: border-box;
    font-weight: 700;
    left: auto;
    text-align: ${align};
    top: 0;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    word-break: keep-all;
    padding: 0;
    ${colWidth &&
    css`
      width: ${colWidth}px;
    `};

    > div {
      box-sizing: border-box;
      ${space};
      ${colWidth &&
      css`
        width: ${colWidth}px;
      `};
    }
  `}
`;

StyledFlatTableHeader.defaultProps = {
  theme: baseTheme,
};

export default StyledFlatTableHeader;
