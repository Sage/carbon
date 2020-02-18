import styled, { css } from 'styled-components';
import baseTheme from '../../../style/themes/base';

const StyledFlatTableCell = styled.td`
  ${({ align, theme }) => css`
    background-color: #fff;
    border-width: 0;
    border-bottom: 1px solid ${theme.table.secondary};
    overflow: visible;
    padding: 10px 24px;
    text-overflow: ellipsis;
    text-align: ${align};
    vertical-align: middle;
    white-space: nowrap;

    &:first-of-type {
      border-left: 1px solid ${theme.table.secondary};
    }

    &:last-of-type {
      border-right: 1px solid ${theme.table.secondary};
    }
  `}
`;

StyledFlatTableCell.defaultProps = {
  theme: baseTheme
};

export default StyledFlatTableCell;
