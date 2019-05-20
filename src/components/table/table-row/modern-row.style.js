import StyledTableCell from '../table-cell/table-cell.style';

export const applyModernRowStyling = ({ colors, table }) => {
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
};

export const applyModernSelectedStyling = ({ table }) => {
  return `
    background-color: ${table.selected};
    border-bottom-color: ${table.selected};
  `;
};

export const applyModernHighlightStyling = ({ table }) => {
  return `
    background-color: ${table.selected};
    border-bottom-color: ${table.selected};
  `;
};
