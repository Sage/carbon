import StyledTableCell from '../table-cell/table-cell.style';

function applyClassicRowStyling() {
  return `
    border-color: #E7F1FC;
    &:hover .common-input__input {
      border-color: #E7F1FC;
    }
    &:nth-child(2n+1) {
      ${StyledTableCell} {
        background-color: #ffffff;
      }
    }
    &:hover {
      ${StyledTableCell} {
        background-color: #E7F1FC;
      }
    }
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
    position: relative;
    &:before {
      background-color: #1573E6;
    }
  `;
}

export {
  applyClassicRowStyling,
  applyClassicSelectedStyling,
  applyClassicHighlightStyling
};
