import { css } from 'styled-components';
import PropTypes from 'prop-types';
import StyledTableCell from '../table-cell/table-cell.style';
import StyledTableHeader from '../table-header/table-header.style';
import baseTheme from '../../../style/themes/base';
import { THEMES } from '../../../style/themes';

const StyledTableRow = css`
  .carbon-table-row {
    ${addCommonStyling}
  }
`;

function isClassic(theme) {
  return theme.name === THEMES.classic || theme.name === THEMES.base || !theme;
}

function addCommonStyling(props) {
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

function selectableRowStyling() {
  return css`
    ${StyledTableCell}:first-child,
    ${StyledTableHeader}:first-child {
      &:not(.carbon-table-cell--select) {
        padding-left: 15px;
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
  const { table, colors } = theme;
  return css`
    .carbon-table-row--selected,
    .carbon-table-row--selected:nth-child(odd),
    .carbon-table-row--selected:hover {
      ${StyledTableCell} {
        background-color: ${isClassic(theme) ? '#1573E6' : table.selected};
        border-bottom-color: ${isClassic(theme) ? '#255BC7' : table.selected};
        color: ${isClassic(theme) ? colors.white : ''};
        position: relative;
    
        &:before {
          background-color: ${isClassic(theme) ? '#255BC7' : ''};
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
        background-color: ${isClassic(theme) ? '#D0E3FA' : table.selected};
        border-bottom-color: ${isClassic(theme) ? '#1573E6' : table.selected};
        position: relative;
  
        &:before {
          background-color: ${isClassic(theme) ? '#1573E6' : ''};
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

StyledTableRow.propTypes = {

  /**
   * Enables multi-selectable table rows.
   */
  selectable: PropTypes.bool,

  /**
   * Enables highlightable table rows.
   */
  highlightable: PropTypes.bool,

  /**
   * Allows developers to manually control selected state for the styled row component.
   */
  selected: PropTypes.bool,

  /**
   * Allows developers to manually control highlighted state for the styled row component.
   */
  highlighted: PropTypes.bool,

  /**
   * Allows developers to manually control isDragged state for the styled row component.
   */
  isDragged: PropTypes.bool,

  /**
   * Allows developers to manually control draggable state for the styled row component.
   */
  isDragging: PropTypes.func
};

StyledTableRow.defaultProps = {
  theme: baseTheme,
  selected: false
};

export default StyledTableRow;
