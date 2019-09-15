import { css } from 'styled-components';
import StyledTableCell from '../table-cell/table-cell.style';
import StyledTableRow from "./table-row.style";

function applyClassicRowStyling(isPassive, isSelected) {
  return css`
    border-color: #E7F1FC;
    &:hover .common-input__input {
      border-color: #E7F1FC;
    }
    &:nth-child(2n+1) {
      ${StyledTableCell} {
        background-color: #ffffff;
      }
    }

    ${!(isPassive || isSelected) && `
      &:hover {
        ${StyledTableCell} {
          background-color: #E7F1FC;
        }
      }
    `}
  `;
}

function applyClassicSelectedStyling() {
  return `
    background-color: #1573E6;
    border-bottom-color: #255BC7;
    color: #ffffff;

    &:before {
      background-color: #255BC7;
    }
  `;
}

function applyClassicHighlightStyling() {
  return `
    background-color: #D0E3FA;
    border-bottom-color: #1573E6;

    &:before {
      background-color: #1573E6;
    }
  `;
}

function applyClassicDraggedStyling() {
  return css`
    ${StyledTableCell} {
      visibility: hidden;
    }
    
    + ${StyledTableRow} {
      ${StyledTableCell} {
        border-top: 1px solid #000A0E;
      }
    }
  `;
}

export {
  applyClassicDraggedStyling,
  applyClassicRowStyling,
  applyClassicSelectedStyling,
  applyClassicHighlightStyling
};
