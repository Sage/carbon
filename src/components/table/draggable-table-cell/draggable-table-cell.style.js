import styled, { css } from 'styled-components';
import StyledTableCell from '../table-cell/table-cell.style';
import baseTheme from '../../../style/themes/base';

const StyledDraggableTableCell = styled(StyledTableCell)`
  ${applyClassicDraggableStyling}
`;

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

StyledDraggableTableCell.propTypes = {};

StyledDraggableTableCell.defaultProps = {
  theme: baseTheme
};

export default StyledDraggableTableCell;
