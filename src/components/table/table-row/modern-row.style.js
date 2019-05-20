import StyledTableCell from '../table-cell/table-cell.style';

function applyModernRowStyling({ colors, table }) {
  return `   
    ${StyledTableCell} {
      padding-top: 0px;
      padding-bottom: 0px;
      background-color: ${colors.white};
    }
    &:hover {
      ${StyledTableCell} {
        background-color: ${table.primary};
      }
    }
  `;
}

function applyModernSelectedStyling({ table }) {
  return `
    background-color: ${table.selected};
    border-bottom-color: ${table.selected};
  `;
}

function applyModernHighlightStyling({ table }) {
  return `
    background-color: ${table.selected};
    border-bottom-color: ${table.selected};
  `;
}

export {
  applyModernRowStyling,
  applyModernSelectedStyling,
  applyModernHighlightStyling
};
