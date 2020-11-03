import { css } from "styled-components";
import StyledTableCell from "../table-cell/table-cell.style";

function applyClassicRowStyling(isPassive, isSelected) {
  return css`
    border-color: #e7f1fc;
    &:hover .common-input__input {
      border-color: #e7f1fc;
    }
    &:nth-child(2n + 1) {
      ${StyledTableCell} {
        background-color: #ffffff;
      }
    }

    .custom-drag-layer && {
      background-color: #e6ebed;
      display: block;

      ${StyledTableCell} {
        background-color: #e6ebed;
        border: none;
      }
    }

    ${!(isPassive || isSelected) &&
    `
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

/**
 * Note: `StyledTableRow` is supplied as parameter
 * instead of being `import`ed, to avoid a dependency cycle
 * between `table-row.style.js` and `table-row-classic.style.js`.
 */
function applyClassicDraggedStyling() {
  return css`
    ${StyledTableCell} {
      background-color: #f2f5f6;
    }
  `;
}

export {
  applyClassicDraggedStyling,
  applyClassicRowStyling,
  applyClassicSelectedStyling,
  applyClassicHighlightStyling,
};
