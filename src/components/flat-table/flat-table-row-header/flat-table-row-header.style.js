import styled, { css } from "styled-components";
import { space } from "styled-system";

import baseTheme from "../../../style/themes/base";

const StyledFlatTableRowHeader = styled.th`
  ${({ align, theme, colWidth, leftPosition }) => css`
    background-color: #fff;
    border: 1px solid ${theme.table.secondary};
    border-top: none;
    box-sizing: border-box;
    left: 0;
    font-weight: normal;
    position: sticky;
    text-align: ${align};
    top: auto;
    vertical-align: middle;
    white-space: nowrap;
    padding: 0;
    ${colWidth &&
    css`
      width: ${colWidth}px;
    `}

    > div {
      box-sizing: border-box;
      ${colWidth &&
      css`
        width: ${colWidth}px;
      `}
      ${space}
    }

    &&& {
      left: ${leftPosition}px;
    }
  `}
`;

StyledFlatTableRowHeader.defaultProps = {
  theme: baseTheme,
};

export default StyledFlatTableRowHeader;
