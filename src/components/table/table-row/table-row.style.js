import styled from 'styled-components';
import PropTypes from 'prop-types';
// import StyledTableCell from '../table-cell/table-cell.style';
// import StyledTableHeader from '../table-header/table-header.style';
import classicStyledRow from './table-row-classic.style';
import modernStyledRow from './table-row-modern.style';
// import StyledDraggableTableCell from '../draggable-table-cell/draggable-table-cell.style';
import { THEMES } from '../../../style/themes';

const StyledTableRow = styled.tr`
  ${styleTableRow}
`;

function styleTableRow(props) {
  return props.theme.name === THEMES.classic ? classicStyledRow(props) : modernStyledRow(props);
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
