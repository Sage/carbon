import styled from "styled-components";
import StyledTableCell from "../table-cell/table-cell.style";
import StyledIcon from "../../icon/icon.style";
import baseTheme from "../../../style/themes/base";

const StyledDraggableTableCell = styled(StyledTableCell)`
  padding: 0;
  width: 21px;
  user-select: none;

  ${StyledTableCell}:first-child {
    padding-left: 0;
  }

  ${StyledIcon} {
    cursor: move;
    cursor: grab;
  }
`;

StyledDraggableTableCell.defaultProps = {
  theme: baseTheme,
};

export default StyledDraggableTableCell;
