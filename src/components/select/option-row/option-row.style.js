import styled, { css } from "styled-components";
import baseTheme from "../../../style/themes/base";

const StyledOptionRow = styled.tr`
  cursor: pointer;

  ${({ hidden }) => hidden && "display: none;"}

  ${({ isHighlighted, theme }) =>
    isHighlighted &&
    css`
      background-color: ${theme.select.selected};
    `}

  :hover {
    background-color: ${({ theme }) => theme.select.selected};
  }

  td {
    line-height: 16px;
    padding: 12px 16px;

    &:first-child {
      font-weight: 700;
    }
  }
`;

StyledOptionRow.defaultProps = {
  theme: baseTheme,
};

export default StyledOptionRow;
