import { css } from 'styled-components';
import StyledTableCell from './table-cell/table-cell.style';
import StyledTableHeader from './table-header/table-header.style';

function applyClassicInternalStyling() {
  return css`
    background-color: #F2F4F5;
    border-radius: 0px;
    border: 1px solid #CCD6DA;
    overflow: visible;
    position: relative;
  `;
}

function applyClassicTableStyling (props) {
  return css`
    background-color: #ffffff;
    border-collapse: separate;
    border-radius: 0px;
    border-spacing: 0;
    min-width: 100%;
    table-layout: fixed;
    width: auto;
    word-break: break-all;
    
    .carbon-spinner {
      height: 8px;
      width: 8px;
      margin-bottom: -4px;
    }

    & caption {
      clip: rect(1px, 1px, 1px, 1px);
      height: 1px;
      overflow: hidden;
      position: absolute !important;
      width: 1px;
      position: absolute;
      top: -99999px;
    }

    ${props.paginate && `
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}

    ${props.tableType === 'secondary' && `
      ${StyledTableCell} {
        background-color: #ffffff;
      }

      ${StyledTableHeader} {
        background-color: #CCD6DA;
        color: #003349;
        
        a:link,
        a:visited,
        a:hover,
        a:active {
          color: #003349;
        }
      }
    `}
  `;
}

export {
  applyClassicInternalStyling,
  applyClassicTableStyling
};

// what do the mainclasses do?
// CSStansition component

// carbon-table--configurable {
//   &.carbon-table__wrapper, .carbon-table__table {
//     border-radius: 0 $tables__border-radius $tables__border-radius $tables__border-radius;
//   }
// } CONFUSING
