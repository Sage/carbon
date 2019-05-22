import { css } from 'styled-components';
import StyledTableCell from '../table-cell/table-cell.style';
import StyledTableHeader from '../table-header/table-header.style';
import {
  applyClassicRowStyling,
  applyClassicSelectedStyling,
  applyClassicHighlightStyling
} from './table-row-classic.style';
import { applyModernRowStyling, applyModernSelectedStyling } from './table-row-modern.style';
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

    ${isClassic(theme) ? applyClassicRowStyling() : applyModernRowStyling(theme)}
    ${selectableRowStyling}
    ${selectedRowStyling}
    ${highlightRowStyling}
    ${dragRowStyling}
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

function selectedRowStyling({ theme }) {
  return css`
    .carbon-table-row--selected,
    .carbon-table-row--selected:nth-child(odd),
    .carbon-table-row--selected:hover {
      ${StyledTableCell} {
        ${isClassic(theme) ? applyClassicSelectedStyling(theme) : applyModernSelectedStyling(theme)}
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

function highlightRowStyling({ theme }) {
  const { table } = theme;
  return css`
    && .carbon-table-row--clickable {
      cursor: pointer;
    }

    && .carbon-table-row--highlighted {
      ${StyledTableCell} {
        ${isClassic(theme) ? applyClassicHighlightStyling() : applyModernSelectedStyling(theme)}
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
