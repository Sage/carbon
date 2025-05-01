import styled from "styled-components";
import DraggableContainer from "../../../__internal__/draggable/draggable-container";
import { StyledFlatTableRowHeader } from "../flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableCheckbox from "../flat-table-checkbox/flat-table-checkbox.style";
import { StyledFlatTableCell } from "../flat-table-cell/flat-table-cell.style";


const allCellTypes = `${StyledFlatTableRowHeader}, ${StyledFlatTableCell}, ${StyledFlatTableCheckbox}`;

const StyledFlatTableBodyDraggable = styled(DraggableContainer)<{ isInSidebar: boolean }>`
  
  & tr[draggable="true"] {
    cursor: grabbing;
  }

    ${({ isInSidebar }) => isInSidebar && `
     & tr[data-drag-state="is-dragging"]{
        border: ${isInSidebar
            ? "var(--colorsUtilityMajor300)"
            : "var(--colorsUtilityMajor200)"}
          2px solid;
        ${allCellTypes} {
          background-color: ${isInSidebar
            ? "var(--colorsUtilityMajor200)"
            : "var(--colorsUtilityMajor150)"};
        }
    `}
  }
`;

export default StyledFlatTableBodyDraggable;