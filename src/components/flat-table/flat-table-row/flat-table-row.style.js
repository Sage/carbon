import styled, { css } from 'styled-components';
import { baseTheme } from '../../../style/themes';
import StyledFlatTableCell from '../flat-table-cell/flat-table-cell.style';
import StyledFlatTableRowHeader from '../flat-table-row-header/flat-table-row-header.style';

const StyledFlatTableRow = styled.tr`
  border-collapse: separate;
  border-radius: 0px;
  border-spacing: 0;
  min-width: 100%;
  table-layout: fixed;
  width: auto;
  word-break: break-all;

  ${({ isRowInteractive, theme }) => isRowInteractive && css`
    cursor: pointer;

    :focus{
      outline: 2px solid ${theme.colors.focus};
      outline-offset: -1px;

      ${StyledFlatTableRowHeader} {
        border-bottom: 1px solid transparent;
        border-left: 1px solid ${theme.colors.focus};
        background-clip: padding-box;
        z-index: 1;

        :before {
          content: '';
          border-top: 2px solid ${theme.colors.focus};
          border-bottom: 1px solid ${theme.colors.focus};
          display: block;
          left: 0px;
          top: -1px;
          height: 100%;
          width: 101%;
          position: absolute;
          z-index: 1;
        }
      }
    }

    :hover ${StyledFlatTableCell},
    :hover ${StyledFlatTableRowHeader} {
      background-color: ${theme.table.hover};
    }
  `}
`;

StyledFlatTableRow.defaultProps = {
  theme: baseTheme
};

export default StyledFlatTableRow;
