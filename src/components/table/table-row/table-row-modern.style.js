import { css } from 'styled-components';
import StyledTableCell from '../table-cell/table-cell.style';
import StyledTableHeader from '../table-header/table-header.style';
import StyledIcon from '../../icon/icon.style';

function applyModernRowStyling(isPassive, { colors, table }) {
  return css`   
    ${StyledTableCell} {
      background-color: ${colors.white};

      ${StyledIcon}::before {
        transform: rotate(90deg);
      }
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

function applyModernDropTargetStyling(isDraggedElementOver, { table }) {
  const border = `1px solid ${isDraggedElementOver ? table.header : 'transparent'}`;

  return css`
    ${isDraggedElementOver && `
      background-color: ${table.dragging};
      border-bottom:    ${border} !important;
    `}

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
