import styled from "styled-components";
import { StyledFlatTableRowHeader } from "../flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableCheckbox from "../flat-table-checkbox/flat-table-checkbox.style";
import { StyledFlatTableCell } from "../flat-table-cell/flat-table-cell.style";

const allCellTypes = `${StyledFlatTableRowHeader}, ${StyledFlatTableCell}, ${StyledFlatTableCheckbox}`;

const StyledFlatTableBodyDraggable = styled.tbody<{
  isInSidebar: boolean;
}>`
  & tr[draggable="true"] {
    cursor: grab;
  }

  & tr[data-drag-state="is-dragging"] {
    cursor: grabbing;
  }

  & tr[data-drag-state="is-being-dragged-over"],
  & tr[data-drag-state="is-dragging"] {
    ${allCellTypes} {
      background-color: ${({ isInSidebar }) =>
        /* istanbul ignore next - PW test added to cover due to difficulty testing */
        isInSidebar
          ? "var(--colorsUtilityMajor200)"
          : "var(--colorsUtilityMajor150)"};
    }
  }
`;

export default StyledFlatTableBodyDraggable;
