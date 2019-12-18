import { css } from 'styled-components';
import StyledTableHeader from './table-header/table-header.style';
import StyledTableRow from './table-row/table-row.style';
import StyledTableCell from './table-cell/table-cell.style';
import StyledIcon from '../icon/icon.style';

function applyClassicInternalStyling() {
  return css`
    background-color: #F2F4F5;
    border: 1px solid #CCD6DA;
  `;
}

function applyClassicTableStyling(props) {
  return css`
    background-color: #ffffff;

    .table__spinner {
      height: 8px;
      width: 8px;
      margin-bottom: -4px;
    }

    ${props.tableType === 'secondary' && `
      ${StyledTableHeader} {
        background-color: #CCD6DA;
        color: #003349;

        ${StyledIcon},
        a:link,
        a:visited,
        a:hover,
        a:active {
          color: #003349;
        }
      }

      ${StyledTableRow} {
        ${StyledTableCell} {
          background-color: #ffffff;
        }

        &:hover ${StyledTableCell} {
          background-color: #E7F1FC;
        }
      }
    `}
  `;
}

export {
  applyClassicInternalStyling,
  applyClassicTableStyling
};
