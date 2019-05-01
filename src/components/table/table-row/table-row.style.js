import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import StyledTableCell from '../table-cell/table-cell.style';
import StyledTableHeader from '../table-header/table-header.style';
import { THEMES } from '../../../style/themes';

const StyledTableRow = styled.tr`
  ${styleTableRow}
`;

function styleTableRow(props) {
  return props.theme.name === THEMES.classic ? classicStyledRow(props) : modernStyledRow(props);
}

function classicStyledRow(props) {
  return css`
    cursor: pointer;
    border-color: #E7F1FC;
    &:hover .common-input__input {
      border-color: #E7F1FC;
    }
    
    ${props.highlightable && props.hightlighted && `
      ${StyledTableCell} {
        background-color: #D0E3FA;
        border-bottom-color: #1573E6;
        position: relative;
      
        &:before {
          background-color: #1573E6;
          ${classicCellHoverStyling}
        }
      }
    `}

    ${!props.selectable && `
      ${StyledTableCell}:first-child,
      ${StyledTableHeader}:first-child {
          padding-left: 15px;
      }
    `}

    ${props.selectable && props.selected && `
      ${StyledTableCell} {
        background: transparent;
        border-color: white;
        color: white;
      }
      
      &:nth-child(2n+1), &:hover {
        ${StyledTableCell} {
          background-color: #1573E6;
          border-bottom-color: #255BC7;
          color: white;
          position: relative;
      
          &:before {
            background-color: #255BC7;
            ${classicCellHoverStyling}
          }
        }
      }
    `}

    ${props.dragging && `
      user-select: none;
    `}

    ${props.dragged && `
      ${StyledTableCell} {
        visibility: hidden;
      }

      + ${props.dragging && `
        ${StyledTableCell} {
          border-top: 1px solid #000A0E;
        }
      `}
    `}

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
  `;
}

function classicCellHoverStyling() {
  return `
    content: "";
    height: 1px;
    left: 0;
    position: absolute;
    top: -1px;
    width: 100%;
  `;
}

function modernStyledRow(props) {

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
   * Allows developers to manually control selected state for the row.
   */
  selected: PropTypes.bool,

  /**
   * Allows developers to manually control highlighted state for the row.
   */
  highlighted: PropTypes.bool,

  dragged: PropTypes.bool,

  dragging: PropTypes.func
};

export default StyledTableRow;
