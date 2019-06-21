import { css } from 'styled-components';
import StyledTableHeader from './table-header/table-header.style';

function applyClassicInternalStyling() {
  return css`
    background-color: #F2F4F5;
    border: 1px solid #CCD6DA;
  `;
}

function applyClassicTableStyling(props) {
  return css`
    background-color: #ffffff;

    .carbon-spinner {
      height: 8px;
      width: 8px;
      margin-bottom: -4px;
    }

    ${props.tableType === 'secondary' && `
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
