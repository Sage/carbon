import { css } from 'styled-components';
import StyledTableCell from '../table-cell/table-cell.style';
import StyledTableHeader from '../table-header/table-header.style';

function styledRow(props) {
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

    .custom-drag-layer {
      & {
        background-color: #002E41;
        cursor: grabbing;
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
        display: block;
      }

      ${StyledTableCell} {
        background-color: #002E41;
      }

      .configurable-item-row__content-wrapper {
        visibility: visible;
      }
    }

    &:first-child ${StyledTableHeader} {
      &:first-child {
        border-radius: 0px 0 0 0;
      }

      &:last-child {
        border-radius: 0 0px 0 0;
      }
    }

    &:hover {
      ${StyledTableCell} {
        background-color: #e7f1fc;
      }
    }

    ${props.onClick && `
      cursor: pointer;
    `}

    ${selectedRowStyling}
    ${highlightRowStyling}
    ${dragRowStyling}
  `;
}

function selectedRowStyling ({ selectable, selected }) {
  if (!selectable) {
    return css`
      ${StyledTableCell}:first-child,
      ${StyledTableHeader}:first-child {
          padding-left: 15px;
      }
    `;
  }

  return css`
    ${selectable && `
      ${StyledTableCell}:first-child,
      ${StyledTableHeader}:first-child {
        text-align: center;
        width: 18px;
      
        .carbon-checkbox {
          height: 15px;
          padding-top: 0;
        }
      }
    `}

    ${selected && `
      &, &:nth-child(2n+1), &:hover {
        ${StyledTableCell} {
          background-color: #1573E6;
          border-bottom-color: #255BC7;
          color: white;
          position: relative;
      
          &:before {
            background-color: #255BC7;
            ${cellHoverStyling}
          }
        }
      }
    `}
  `;
}

function highlightRowStyling ({ highlighted }) {
  return css`
    ${highlighted && `
      ${StyledTableCell} {
        background-color: #D0E3FA;
        border-bottom-color: #1573E6;
        position: relative;
      
        &:before {
          background-color: #1573E6;
          ${cellHoverStyling}
        }
      }
    `}
  `;
}

function cellHoverStyling() {
  return `
    content: "";
    height: 1px;
    left: 0;
    position: absolute;
    top: -1px;
    width: 100%;
  `;
}


function dragRowStyling ({ dragging, dragged }) {
  return css`
    ${dragging && `
      user-select: none;
    `}

    ${dragged && `
      ${StyledTableCell} {
        visibility: hidden;
      }

      + ${dragging && `
        ${StyledTableCell} {
          border-top: 1px solid #000A0E;
        }
      `}
    `}

    .draggable-table-cell__icon {
      cursor: move;
      padding: 8.5px 14px;
    
      ${dragging && dragged && `
        &,
        .custom-drag-layer & {
          cursor: grabbing;
          cursor: -moz-grabbing;
          cursor: -webkit-grabbing;
        }
      `}
  `;
}

export default styledRow;
