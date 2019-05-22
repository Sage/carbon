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
    background-color: ${table.selected} !important;
    border-bottom-color: ${table.selected} !important;
  `;
}

export {
  applyModernRowStyling,
  applyModernSelectedStyling
};
