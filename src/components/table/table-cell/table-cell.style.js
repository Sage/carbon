import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { THEMES } from '../../../style/themes';

const StyledTableCell = styled.td`
  ${styleTableCell}
`;

function styleTableCell(props) {
  return props.theme.name === THEMES.classic ? classicStyledCell(props) : modernStyledCell(props);
}

function classicStyledCell(props) {
  return css`
    background-color: #f2f5f6;
    border-bottom: 1px solid #ccd6db;
    border-left: none;
    border-right: none;
    border-top: none;
    font-size: 13px;
    overflow: visible;
    padding: 8px;
    text-align: ${props.align !== '' ? props.align : 'left'};
    vertical-align: middle;
    white-space: nowrap;

    > .common-input {
      margin-bottom: -4px;
      margin-left: -6px;
      margin-right: -6px;
      margin-top: -4px;
    }
    
    ${props.action && `
      width: 18px;

      .icon-delete:before {
        cursor: pointer;
        color: #668491;
        font-size: 16px;
        line-height: 15px;
        margin-left: 1px;
      }
    
      .icon-delete:hover:before {
        color: #C7384F;
      }
    `}
  `;

// const TableStyle = styled.table`
//     ${classicStyledCell} {
  // text-align: ${props.align};
//     }
// `;

  /*
  add when styled row exists
  &:first-child {
      &:first-child {
        border-radius: 0px 0 0 0;
      }

      &:last-child {
        border-radius: 0px 0 0;
      }
    }
  */
}

function modernStyledCell(props) {

}

StyledTableCell.propTypes = {
  isSelectable: PropTypes.bool
};

export default StyledTableCell;
