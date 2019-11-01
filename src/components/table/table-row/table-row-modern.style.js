import { css } from 'styled-components';
import StyledTableCell from '../table-cell/table-cell.style';
import StyledTableHeader from '../table-header/table-header.style';

function applyModernRowStyling(isPassive, { colors, table }) {
  return css`   
    ${StyledTableCell} {
      background-color: ${colors.white};
    }

    ${StyledTableHeader} {
      padding: 10px 8px;
    }

    .custom-drag-layer && {
      background-color: ${table.dragging};
      display: block;

      ${StyledTableCell} {
        background-color: ${table.dragging};
        border: none;
      }
    }

    ${!isPassive && css`
      &:hover {
        ${StyledTableCell} {
          background-color: ${table.primary};
        }
      }
    `}
  `;
}

function applyModernSelectedStyling({ table }) {
  return `
    background-color: ${table.selected};
    border-bottom-color: ${table.selected};
  `;
}

function applyModernDropTargetStyling() {
  const border = '1px solid transparent';

  return css`
    border-top: ${border};

    &:first-child {
      border-left: ${border};
    }

    &:last-child {
      border-right: ${border};
    }
  `;
}

export {
  applyModernRowStyling,
  applyModernSelectedStyling,
  applyModernDropTargetStyling
};
