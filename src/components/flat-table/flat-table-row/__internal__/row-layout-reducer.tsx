import { buildPositionMap } from "../../__internal__";

interface RowLayoutState {
  leftPositions: Record<string, number>;
  rightPositions: Record<string, number>;
  firstCellIndex: number;
  lhsRowHeaderIndex: number;
  rhsRowHeaderIndex: number;
  firstCellId: string | null;
  cellsArray: Element[];
}

export const initialRowLayoutState: RowLayoutState = {
  leftPositions: {},
  rightPositions: {},
  firstCellIndex: 0,
  lhsRowHeaderIndex: -1,
  rhsRowHeaderIndex: -1,
  firstCellId: null,
  cellsArray: [],
};

export const rowLayoutReducer = (
  state: RowLayoutState,
  cells: HTMLTableCellElement[],
): RowLayoutState => {
  const firstIndex = cells.findIndex(
    (cell) => cell.getAttribute("data-component") !== "flat-table-checkbox",
  );
  const lhsIndex = cells.findIndex(
    (cell) => cell.getAttribute("data-sticky-align") === "left",
  );
  const rhsIndex = cells.findIndex(
    (cell) => cell.getAttribute("data-sticky-align") === "right",
  );
  const { leftPositions, rightPositions, firstCellId } = state;

  return {
    cellsArray: cells,
    firstCellIndex: firstIndex !== -1 ? firstIndex : 0,
    firstCellId:
      firstIndex !== -1 ? cells[firstIndex].getAttribute("id") : firstCellId,
    lhsRowHeaderIndex: lhsIndex,
    rhsRowHeaderIndex: rhsIndex,
    leftPositions:
      lhsIndex !== -1
        ? buildPositionMap(cells.slice(0, lhsIndex + 1), "offsetWidth")
        : leftPositions,
    rightPositions:
      rhsIndex !== -1
        ? buildPositionMap(
            cells.slice(rhsIndex, cells.length).reverse(),
            "offsetWidth",
          )
        : rightPositions,
  };
};
