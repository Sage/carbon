import styled, { css } from 'styled-components';
import StyledTableCell from '../table-cell/table-cell.style';
import { THEMES } from '../../../style/themes';

const StyledDraggableTableCell = styled(StyledTableCell)`
  ${styleDraggableTableCell}
`;

function styleDraggableTableCell(props) {
  return props.theme.name === THEMES.classic ? applyClassicDraggableStyling() : applyModernDraggableStyling();
}

function applyClassicDraggableStyling() {
  return css`
    padding: 0;
    width: 21px;  
    user-select: none;

    &${StyledTableCell}:first-child {
      padding-left: 0;
    }
  `;
}

function applyModernDraggableStyling() {
  return css`
    padding: 0;
    width: 21px;  
    user-select: none;

    &${StyledTableCell}:first-child {
      padding-left: 0;
    }
  `;
}

export default StyledDraggableTableCell;
