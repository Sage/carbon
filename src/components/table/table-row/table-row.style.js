import { css } from 'styled-components';
import StyledTableCell from '../table-cell/table-cell.style';
import StyledTableHeader from '../table-header/table-header.style';
import { isClassic } from '../../../utils/helpers/style-helper';

/**
 * Current version of react-dnd used in DragAndDrop is incompatible
 * with styled-components, this can be uodated once the issue is fixed
 */
const StyledTableRow = css`
  .carbon-table-row {
    ${applyRowStyling}
  }
`;

function applyRowStyling(props) {
  const { theme } = props;
  return css`
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

    ${isClassic(theme) ? applyClassicStyling : applyModernStyling}
    ${selectableRowStyling}
    ${selectedRowStyling}
    ${highlightRowStyling}
    ${dragRowStyling}
  `;
}

function applyClassicStyling() {
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

    &:hover {
      ${StyledTableCell} {
        background-color: #E7F1FC;
      }
    }
  `;
}

function applyModernStyling({ theme }) {
  const { colors, table } = theme;
  return css`   
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

function selectableRowStyling({ theme }) {
  return css`
    ${StyledTableCell}:first-child,
    ${StyledTableHeader}:first-child {
      &:not(.carbon-table-cell--select) {
        ${isClassic(theme) ? 'padding-left: 15px' : ''};
      }
    }

    .carbon-table-cell--select:first-child,
    carbon-table-cell--select:first-child {
        text-align: center;
        width: 18px;
      
        .carbon-checkbox {
          height: 15px;
          padding-top: 0;
        }
      }
    }
  `;
}

function selectedRowStyling ({ theme }) {
  return css`
    .carbon-table-row--selected,
    .carbon-table-row--selected:nth-child(odd),
    .carbon-table-row--selected:hover {
      ${StyledTableCell} {
        ${isClassic(theme) ? classicSelectedStyling : modernSelectedStyling}
        position: relative;
    
        &:before {
          content: "";
          height: 1px;
          left: 0;
          position: absolute;
          top: -1px;
          width: 100%;
        }
      }
    }
  `;
}

function classicSelectedStyling({ theme }) {
  const { colors } = theme;
  return css`
    background-color: #1573E6;
    border-bottom-color: #255BC7;
    color: ${colors.white};

    &:before {
      background-color: #255BC7;
    }
  `;
}

function modernSelectedStyling({ theme }) {
  const { table } = theme;
  return css`
    background-color: ${table.selected};
    border-bottom-color: ${table.selected};
  `;
}

function highlightRowStyling({ theme }) {
  const { table } = theme;
  return css`
    && .carbon-table-row--clickable {
      cursor: pointer;
    }

    && .carbon-table-row--highlighted {
      ${StyledTableCell} {
        ${isClassic(theme) ? classicHighlightStyling : modernHighlightStyling}
        position: relative;
  
        &:before {
          content: "";
          height: 1px;
          left: 0;
          position: absolute;
          top: -1px;
          width: 100%;
        }
      }
  
      &:hover {
        ${StyledTableCell} {
          background-color: ${isClassic(theme) ? '#D0E3FA' : table.selected};
        }
      }
    }
  `;
}

function classicHighlightStyling() {
  return css`
    background-color: #D0E3FA;
    border-bottom-color: #1573E6;
    position: relative;

    &:before {
      background-color: #1573E6;
    }
  `;
}

function modernHighlightStyling({ theme }) {
  const { table } = theme;
  return css`
    background-color: ${table.selected};
    border-bottom-color: ${table.selected};
  `;
}

function dragRowStyling() {
  return css`
    .carbon-table-row--dragging {
      user-select: none;
    }

    .carbon-table-row--dragged {
      ${StyledTableCell} {
        visibility: hidden;
      }

      + .carbon-table-row--dragging {
        ${StyledTableCell} {
          border-top: 1px solid #000A0E;
        }
      }
    }

    .draggable-table-cell__icon {
      cursor: move;
      padding: 8.5px 14px;
  
    &, .custom-drag-layer & {
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    }
`;
}
export default StyledTableRow;
